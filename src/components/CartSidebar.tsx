import { CartItem } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartSidebarProps {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: () => void;
  totalPrice: number;
  totalItems: number;
}

export const CartSidebar = ({
  cart,
  isOpen,
  onClose,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
  totalPrice,
  totalItems,
}: CartSidebarProps) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full md:w-96 bg-gray-800 border-l border-gray-600 z-50 transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Scanlines background */}
        <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-600 bg-gray-700 relative z-10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-gray-400" />
            <h2 className="font-inter font-medium text-base text-gray-300">
              Cart
            </h2>
            <Badge className="bg-gray-600 text-gray-300 font-mono text-xs">
              {totalItems}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-600 hover:text-gray-300 h-7 w-7 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 relative z-10">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 mx-auto text-gray-500 mb-3 opacity-30" />
              <p className="text-gray-500 font-mono text-sm">
                Cart is empty
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <Card key={item.id} className="p-3 bg-gray-700 border-gray-600">
                <div className="flex items-center gap-3">
                  {/* Item Image */}
                  <div className="w-12 h-12 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-inter font-medium text-xs text-gray-300 truncate">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 font-mono text-sm">
                      R$ {item.price.toFixed(2)}
                    </p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 border-gray-600/50 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="text-foreground font-mono font-bold w-8 text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 border-gray-600/50 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-destructive hover:bg-destructive hover:text-destructive-foreground flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="border-t-2 border-gray-600 p-4 bg-card/50 relative z-10">
          <Separator className="mb-4 bg-gray-600/30" />
            
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="font-inter font-bold text-lg text-foreground">
                TOTAL:
              </span>
              <span className="font-mono font-black text-2xl text-gray-300">
                R$ {totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={onCheckout}
              className="neon-button w-full font-mono text-lg py-6"
              size="lg"
            >
              CHECKOUT BRAINROT
            </Button>
          </div>
        )}
      </div>
    </>
  );
};