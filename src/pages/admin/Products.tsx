import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Product, Rarity } from '@/types/product';
import { products as initialProducts } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const AdminProducts = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    id: '',
    name: '',
    price: 0,
    rarity: 'brainrot',
    image: '',
    gameValue: ''
  });

  useEffect(() => {
    // Carregar produtos do localStorage ou usar os iniciais
    const savedProducts = localStorage.getItem('admin_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  // Salvar produtos no localStorage quando mudar
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('admin_products', JSON.stringify(products));
    }
  }, [products]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = () => {
    if (!editingProduct) return;

    setProducts(prevProducts =>
      prevProducts.map(p => (p.id === editingProduct.id ? editingProduct : p))
    );
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }
  };
  
  const handleDeleteAllProducts = () => {
    if (window.confirm('Tem certeza que deseja apagar TODOS os produtos? Esta ação não pode ser desfeita.')) {
      setProducts([]);
      localStorage.removeItem('admin_products');
      toast({
        title: "Produtos apagados",
        description: "Todos os produtos foram removidos com sucesso.",
      });
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.id || !newProduct.name || !newProduct.image || newProduct.price <= 0) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    const productToAdd = {
      id: newProduct.id,
      name: newProduct.name,
      price: Number(newProduct.price),
      rarity: newProduct.rarity as Rarity,
      image: newProduct.image,
      gameValue: newProduct.gameValue
    } as Product;

    setProducts(prevProducts => [...prevProducts, productToAdd]);
    setNewProduct({
      id: '',
      name: '',
      price: 0,
      rarity: 'brainrot',
      image: '',
      gameValue: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-800 p-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-300">Administração de Produtos</h1>
          <div className="flex gap-2">
            <Button 
              onClick={handleDeleteAllProducts} 
              variant="destructive" 
              className="bg-gray-700 hover:bg-gray-800"
            >
              Apagar Todos os Produtos
            </Button>
            <Button onClick={handleLogout} variant="outline" className="text-gray-300 border-gray-600">Sair</Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Lista de Produtos */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300">Produtos ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="border border-gray-600 rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="p-2 text-left text-gray-300">Nome</th>
                        <th className="p-2 text-left text-gray-300">Preço</th>
                        <th className="p-2 text-left text-gray-300">Dinheiro do jogo</th>
                        <th className="p-2 text-left text-gray-300">Raridade</th>
                        <th className="p-2 text-left text-gray-300">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b border-gray-600">
                          <td className="p-1 text-gray-400 text-sm">{product.name}</td>
                          <td className="p-1 text-gray-400 text-sm">${product.price.toFixed(2)}</td>
                          <td className="p-1 text-gray-400 text-sm">{product.gameValue || '-'}</td>
                          <td className="p-1 text-gray-400 text-sm">{product.rarity}</td>
                          <td className="p-1 flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 text-xs border-gray-600 text-gray-300 hover:bg-gray-600"
                              onClick={() => handleEditProduct(product)}
                            >
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="h-7 text-xs bg-gray-700 hover:bg-gray-800"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              Excluir
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Edição ou Adição */}
          <Card className="bg-gray-700 border-gray-600">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-300">
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingProduct ? (
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">ID</label>
                    <Input 
                      value={editingProduct.id} 
                      disabled
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Nome</label>
                    <Input 
                      value={editingProduct.name} 
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Preço</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={editingProduct.price} 
                      onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Raridade</label>
                    <select 
                      className="w-full p-1.5 bg-gray-800 text-gray-300 border border-gray-600 rounded-md text-sm"
                      value={editingProduct.rarity}
                      onChange={e => setEditingProduct({...editingProduct, rarity: e.target.value as Rarity})}
                    >
                      <option value="brainrot">Brainrot</option>
                      <option value="secreto">Secreto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">URL da Imagem</label>
                    <Input 
                      value={editingProduct.image} 
                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Dinheiro do jogo (ex: 70M, 2B, 1.5T)</label>
                    <Input 
                      value={editingProduct.gameValue || ''} 
                      onChange={e => setEditingProduct({...editingProduct, gameValue: e.target.value})}
                      placeholder="Ex: 70M, 2B, 1.5T"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <Button variant="outline" onClick={handleCancelEdit} className="text-xs h-8 border-gray-600 text-gray-300 hover:bg-gray-600">
                      Cancelar
                    </Button>
                    <Button onClick={handleSaveEdit} className="text-xs h-8 bg-gray-600 hover:bg-gray-500">
                      Salvar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">ID</label>
                    <Input 
                      value={newProduct.id} 
                      onChange={e => setNewProduct({...newProduct, id: e.target.value})}
                      placeholder="ID único do produto"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Nome</label>
                    <Input 
                      value={newProduct.name} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Nome do produto"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Preço</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={newProduct.price || ''} 
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      placeholder="Preço em dólares"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Raridade</label>
                    <select 
                      className="w-full p-1.5 bg-gray-800 text-gray-300 border border-gray-600 rounded-md text-sm"
                      value={newProduct.rarity as string}
                      onChange={e => setNewProduct({...newProduct, rarity: e.target.value as Rarity})}
                    >
                      <option value="brainrot">Brainrot</option>
                      <option value="secreto">Secreto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">URL da Imagem</label>
                    <Input 
                      value={newProduct.image} 
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="URL da imagem do produto"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-xs text-gray-400">Dinheiro do jogo (ex: 70M, 2B, 1.5T)</label>
                    <Input 
                      value={newProduct.gameValue || ''} 
                      onChange={e => setNewProduct({...newProduct, gameValue: e.target.value})}
                      placeholder="Ex: 70M, 2B, 1.5T"
                      className="bg-gray-800 text-gray-300 border-gray-600"
                    />
                  </div>
                  <Button onClick={handleAddProduct} className="w-full mt-3 text-xs h-8 bg-gray-600 hover:bg-gray-500">Adicionar Produto</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;