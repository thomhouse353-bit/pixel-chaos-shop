import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
  cartItemCount: number;
}

export const Header = ({ onOpenCart, cartItemCount }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-sm border-b-2 border-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="font-inter font-black text-2xl md:text-4xl">
              <span 
                className="glitch-text text-primary" 
                data-text="BRAINROT"
              >
                BRAINROT
              </span>
              <span className="text-secondary ml-2">GOD</span>
              <span className="text-accent ml-2">BAZAAR</span>
            </h1>
          </div>

          {/* Cart Button */}
          <Button
            onClick={onOpenCart}
            className="neon-button relative font-mono"
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            CART
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground font-mono min-w-[1.5rem] h-6 flex items-center justify-center">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};