import { useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Filter } from 'lucide-react';
import { Rarity } from '@/types/product';

export const Store = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rarityFilter, setRarityFilter] = useState<Rarity | 'all'>('all');
  const { toast } = useToast();
  
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your brainrot collection.`,
      duration: 2000,
    });
  };

  const handleCheckout = () => {
    // Simulate checkout process
    toast({
      title: "🧠 BRAINROT PURCHASED! 🧠",
      description: `Successfully acquired ${getTotalItems()} creatures for R$ ${getTotalPrice().toFixed(2)}!`,
      duration: 4000,
    });
    clearCart();
    setIsCartOpen(false);
  };

  const filteredProducts = products.filter(product => 
    rarityFilter === 'all' || product.rarity === rarityFilter
  );

  const brainrotCount = products.filter(p => p.rarity === 'brainrot').length;
  const secretoCount = products.filter(p => p.rarity === 'secreto').length;

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background scanlines */}
      <div className="fixed inset-0 scanlines opacity-10 pointer-events-none" />
      
      <Header onOpenCart={() => setIsCartOpen(true)} cartItemCount={getTotalItems()} />
      
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Store Intro */}
        <div className="text-center mb-12">
          <h2 className="font-inter font-black text-3xl md:text-5xl mb-4">
            <span className="text-primary">COLLECT</span>{' '}
            <span className="text-secondary">RARE</span>{' '}
            <span className="text-accent">CREATURES</span>
          </h2>
          <p className="text-muted-foreground font-mono text-lg max-w-2xl mx-auto">
            Welcome to the most chaotic pixel creature marketplace in the multiverse. 
            Each creature is blessed with pure brainrot energy.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="font-inter font-bold text-foreground">FILTER BY RARITY:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={rarityFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('all')}
                className="font-mono"
                size="sm"
              >
                ALL ({products.length})
              </Button>
              
              <Button
                variant={rarityFilter === 'brainrot' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('brainrot')}
                className="font-mono"
                size="sm"
              >
                🧠 BRAINROT GOD ({brainrotCount})
              </Button>
              
              <Button
                variant={rarityFilter === 'secreto' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('secreto')}
                className="font-mono"
                size="sm"
              >
                🔐 SECRETO ({secretoCount})
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-primary/30" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-mono text-lg">
              No creatures found with the selected rarity filter.
            </p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <Separator className="mb-8 bg-primary/30" />
          <p className="text-muted-foreground font-mono">
            All creatures are procedurally blessed with maximum brainrot energy. 
            No refunds. Only chaos.
          </p>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        cart={cart}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
        totalItems={getTotalItems()}
      />
    </div>
  );
};