import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuditLogEntry {
  userId: string;
  action: string;
  targetTable: string;
  targetId: string;
  before: any;
  after: any;
  timestamp: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginAttempts: number;
  isLocked: boolean;
  lockoutTime: number | null;
  currentUser: string | null;
  logAction: (action: string, targetTable: string, targetId: string, before: any, after: any) => void;
  getAuditLogs: () => AuditLogEntry[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciais fixas para o admin
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // Em produção, use uma senha mais forte
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 minutos em milissegundos

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Verificar se a conta está bloqueada
    const storedLockoutTime = localStorage.getItem('lockoutTime');
    if (storedLockoutTime) {
      const lockTime = parseInt(storedLockoutTime);
      if (lockTime > Date.now()) {
        setIsLocked(true);
        setLockoutTime(lockTime);
      } else {
        // Se o tempo de bloqueio já passou, limpar o bloqueio
        localStorage.removeItem('lockoutTime');
        localStorage.removeItem('loginAttempts');
        setIsLocked(false);
        setLoginAttempts(0);
      }
    }
    
    const storedAttempts = localStorage.getItem('loginAttempts');
    if (storedAttempts) {
      setLoginAttempts(parseInt(storedAttempts));
    }
  }, []);

  // Função para atualizar o timer de bloqueio
  useEffect(() => {
    let timer: number | undefined;
    
    if (isLocked && lockoutTime) {
      timer = window.setInterval(() => {
        if (lockoutTime <= Date.now()) {
          setIsLocked(false);
          setLoginAttempts(0);
          localStorage.removeItem('lockoutTime');
          localStorage.removeItem('loginAttempts');
        }
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLocked, lockoutTime]);

  // Função para registrar ações do usuário
  const logAction = (action: string, targetTable: string, targetId: string, before: any, after: any) => {
    if (!currentUser) return;
    
    const newLog: AuditLogEntry = {
      userId: currentUser,
      action,
      targetTable,
      targetId,
      before,
      after,
      timestamp: Date.now()
    };
    
    const updatedLogs = [...auditLogs, newLog];
    setAuditLogs(updatedLogs);
    
    // Salvar logs no localStorage
    localStorage.setItem('auditLogs', JSON.stringify(updatedLogs));
  };
  
  // Função para obter logs
  const getAuditLogs = (): AuditLogEntry[] => {
    return auditLogs;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Verificar se a conta está bloqueada
    if (isLocked) {
      return false;
    }
    
    // Verificar credenciais
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      setCurrentUser(username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('currentUser', username);
      localStorage.removeItem('loginAttempts');
      return true;
    } else {
      // Incrementar tentativas de login
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      localStorage.setItem('loginAttempts', attempts.toString());
      
      // Verificar se atingiu o limite de tentativas
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        const lockTime = Date.now() + LOCKOUT_DURATION;
        setIsLocked(true);
        setLockoutTime(lockTime);
        localStorage.setItem('lockoutTime', lockTime.toString());
      }
      
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Carregar logs do localStorage
  useEffect(() => {
    const storedLogs = localStorage.getItem('auditLogs');
    if (storedLogs) {
      setAuditLogs(JSON.parse(storedLogs));
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      loginAttempts, 
      isLocked, 
      lockoutTime,
      currentUser,
      logAction,
      getAuditLogs
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};