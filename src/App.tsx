import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Index } from '@/pages/Index';
import { AuthProvider } from '@/contexts/AuthContext';
import AdminLogin from '@/pages/admin/Login';
import AdminProducts from '@/pages/admin/Products';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';
import NotFound from '@/pages/NotFound';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin/products" element={<AdminProducts />} />
            </Route>
            
            {/* Add your custom routes above this line */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
