import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const rarityStyles = {
    brainrot: 'bg-gray-700',
    secreto: 'bg-gray-700',
  };

  const rarityBadgeStyles = {
    brainrot: 'bg-gray-600 text-gray-300',
    secreto: 'bg-gray-600 text-gray-300',
  };

  const rarityLabels = {
    brainrot: 'Brainrot',
    secreto: 'Secreto',
  };

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden border border-gray-600',
        rarityStyles[product.rarity]
      )}
    >
      {/* Scanlines effect for ambiance */}
      <div className="absolute inset-0 scanlines opacity-10 pointer-events-none" />
      
      {/* Product Image */}
      <div className="relative p-2 aspect-square flex items-center justify-center bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain pixelated"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Product Info */}
      <div className="p-2 space-y-2 relative z-10">
        {/* Rarity Badge */}
        <div className="flex justify-between items-start">
          <Badge 
            className={cn(
              'text-xs font-mono',
              rarityBadgeStyles[product.rarity]
            )}
          >
            {rarityLabels[product.rarity]}
          </Badge>
        </div>

        {/* Name */}
        <h3 className="font-inter font-medium text-sm text-gray-300">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-base font-mono text-gray-400">
          R$ {product.price.toFixed(2)}
        </div>
        
        {/* Game Value */}
        {product.gameValue && (
          <div className="text-xl font-mono text-gray-600 font-medium">
            {product.gameValue}
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full mt-2 font-mono text-xs h-7 bg-gray-600 hover:bg-gray-500 text-gray-300"
          size="sm"
        >
          ADD TO CART
        </Button>
      </div>
    </Card>
  );
};