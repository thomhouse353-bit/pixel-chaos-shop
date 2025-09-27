import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onOpenCart: () => void;
  cartItemCount: number;
}

export const Header = ({ onOpenCart, cartItemCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-600 bg-gray-800/95 backdrop-blur supports-[backdrop-filter]:bg-gray-800/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/" className="font-inter font-black text-2xl text-gray-300">
            PIXEL CHAOS
          </a>
          <Badge className="bg-gray-700 text-gray-300 font-mono">SHOP</Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Admin Link */}
          <Link to="/admin/login">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
              title="Área de Administração"
            >
              <Lock className="h-4 w-4" />
            </Button>
          </Link>
          
          {/* Cart Button */}
          <Button 
            variant="outline" 
            size="icon"
            onClick={onOpenCart}
            className="relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};