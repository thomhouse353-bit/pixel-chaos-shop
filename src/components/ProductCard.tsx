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
    brainrot: 'rarity-brainrot bg-card/50',
    secreto: 'rarity-secreto bg-gradient-to-br from-purple-900/30 to-pink-900/30',
  };

  const rarityBadgeStyles = {
    brainrot: 'bg-brainrot-green text-brainrot-black font-bold',
    secreto: 'bg-rarity-secreto text-brainrot-black font-bold animate-pulse',
  };

  const rarityLabels = {
    brainrot: '🧠 BRAINROT GOD',
    secreto: '🔐 SECRETO',
  };

  return (
    <Card 
      className={cn(
        'group relative overflow-hidden border-2 transition-all duration-300 hover:scale-105 hover:z-10',
        rarityStyles[product.rarity]
      )}
    >
      {/* Scanlines effect for ambiance */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
      
      {/* Product Image */}
      <div className="relative p-4 aspect-square flex items-center justify-center bg-gradient-to-br from-transparent to-black/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain pixelated transition-transform duration-300 group-hover:scale-110"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3 relative z-10">
        {/* Rarity Badge */}
        <div className="flex justify-between items-start">
          <Badge 
            className={cn(
              'text-xs font-mono uppercase tracking-wider',
              rarityBadgeStyles[product.rarity]
            )}
          >
            {rarityLabels[product.rarity]}
          </Badge>
        </div>

        {/* Name */}
        <h3 className="font-inter font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="text-2xl font-mono font-black text-primary">
          R$ {product.price.toFixed(2)}
        </div>
        
        {/* Game Value */}
        {product.gameValue && (
          <div className="text-lg font-mono text-accent mt-1">
            Dinheiro do jogo: <span className="font-bold">{product.gameValue}</span>
          </div>
        )}

        {/* Add to Cart Button */}
        <Button
          onClick={() => onAddToCart(product)}
          className="neon-button w-full mt-4 font-mono text-sm"
          size="sm"
        >
          ADD TO CART
        </Button>
      </div>
    </Card>
  );
};