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
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const { toast } = useToast();
  
  // Carregar produtos do localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);
  
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
    <div className="min-h-screen bg-gray-800 relative">
      {/* Animated background scanlines */}
      <div className="fixed inset-0 scanlines opacity-5 pointer-events-none" />
      
      <Header onOpenCart={() => setIsCartOpen(true)} cartItemCount={getTotalItems()} />
      
      <main className="container mx-auto px-3 py-4 relative z-10">
        {/* Store Intro */}
        <div className="text-center mb-6">
          <h2 className="font-inter font-bold text-xl md:text-2xl mb-2">
            <span className="text-gray-400">COLLECT</span>{' '}
            <span className="text-gray-500">RARE</span>{' '}
            <span className="text-gray-400">CREATURES</span>
          </h2>
          <p className="text-gray-500 font-mono text-sm max-w-xl mx-auto">
            Welcome to the most chaotic pixel creature marketplace in the multiverse. 
            Each creature is blessed with pure brainrot energy.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Filter className="w-3 h-3 text-gray-500" />
              <span className="font-inter font-bold text-gray-400 text-sm">FILTER BY RARITY:</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
              <Button
                variant={rarityFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('all')}
                className="font-mono text-xs h-7 bg-gray-700 hover:bg-gray-600 border-gray-600"
                size="sm"
              >
                All <Badge className="ml-1 text-xs bg-gray-600">{products.length}</Badge>
              </Button>
              
              <Button
                variant={rarityFilter === 'brainrot' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('brainrot')}
                className="font-mono text-xs h-7 bg-gray-700 hover:bg-gray-600 border-gray-600"
                size="sm"
              >
                Brainrot <Badge className="ml-1 text-xs bg-gray-600">{brainrotCount}</Badge>
              </Button>
              
              <Button
                variant={rarityFilter === 'secreto' ? 'default' : 'outline'}
                onClick={() => setRarityFilter('secreto')}
                className="font-mono text-xs h-7 bg-gray-700 hover:bg-gray-600 border-gray-600"
                size="sm"
              >
                Secreto <Badge className="ml-1 text-xs bg-gray-600">{secretoCount}</Badge>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-8 bg-gray-600/30" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-6">
            <h3 className="text-lg font-bold mb-1 text-gray-400">No creatures found</h3>
            <p className="text-gray-500 text-sm">Try changing your filter or check back later!</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <Separator className="mb-8 bg-gray-600/30" />
          <p className="text-muted-foreground font-mono">
            All creatures are procedurally blessed with maximum brainrot energy. 
            No refunds. Only chaos.
          </p>
        </div>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
        totalItems={getTotalItems()}
      />
    </div>
  );
};