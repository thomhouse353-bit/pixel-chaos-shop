import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLocked, loginAttempts, lockoutTime } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLocked) {
      setError('Conta bloqueada. Tente novamente mais tarde.');
      return;
    }

    try {
      const success = await login(username, password);
      if (success) {
        navigate('/admin/products');
      } else {
        const remainingAttempts = 3 - loginAttempts;
        if (remainingAttempts > 0) {
          setError(`Credenciais inválidas. Você tem mais ${remainingAttempts} tentativa(s).`);
        } else {
          setError('Muitas tentativas inválidas. Conta bloqueada por 5 minutos.');
        }
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    }
  };

  // Formatar o tempo restante de bloqueio
  const formatRemainingTime = () => {
    if (!lockoutTime) return '';
    
    const remainingMs = lockoutTime - Date.now();
    if (remainingMs <= 0) return '';
    
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);
    
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Acesse a área administrativa da loja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {isLocked && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Conta bloqueada. Tente novamente em {formatRemainingTime()}.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="username">Usuário</label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLocked}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="password">Senha</label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLocked}
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full mt-4" 
              disabled={isLocked}
            >
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <a href="/" className="text-sm text-primary hover:underline">
            Voltar para a loja
          </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;