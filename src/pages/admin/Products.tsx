import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Product, Rarity } from '@/types/product';
import { products as initialProducts } from '@/data/products';

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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Administração de Produtos</h1>
          <Button onClick={handleLogout} variant="outline">Sair</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Lista de Produtos */}
          <Card>
            <CardHeader>
              <CardTitle>Produtos ({products.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left">Nome</th>
                        <th className="p-2 text-left">Preço</th>
                        <th className="p-2 text-left">Dinheiro do jogo</th>
                        <th className="p-2 text-left">Raridade</th>
                        <th className="p-2 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b">
                          <td className="p-2">{product.name}</td>
                          <td className="p-2">${product.price.toFixed(2)}</td>
                          <td className="p-2">{product.gameValue || '-'}</td>
                          <td className="p-2">{product.rarity}</td>
                          <td className="p-2 flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                            >
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
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
          <Card>
            <CardHeader>
              <CardTitle>
                {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editingProduct ? (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">ID</label>
                    <Input 
                      value={editingProduct.id} 
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Nome</label>
                    <Input 
                      value={editingProduct.name} 
                      onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Preço</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={editingProduct.price} 
                      onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Raridade</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={editingProduct.rarity}
                      onChange={e => setEditingProduct({...editingProduct, rarity: e.target.value as Rarity})}
                    >
                      <option value="brainrot">Brainrot</option>
                      <option value="secreto">Secreto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">URL da Imagem</label>
                    <Input 
                      value={editingProduct.image} 
                      onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Dinheiro do jogo (ex: 70M, 2B, 1.5T)</label>
                    <Input 
                      value={editingProduct.gameValue || ''} 
                      onChange={e => setEditingProduct({...editingProduct, gameValue: e.target.value})}
                      placeholder="Ex: 70M, 2B, 1.5T"
                    />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={handleSaveEdit}>Salvar</Button>
                    <Button variant="outline" onClick={handleCancelEdit}>Cancelar</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block mb-1">ID</label>
                    <Input 
                      value={newProduct.id} 
                      onChange={e => setNewProduct({...newProduct, id: e.target.value})}
                      placeholder="ID único do produto"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Nome</label>
                    <Input 
                      value={newProduct.name} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      placeholder="Nome do produto"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Preço</label>
                    <Input 
                      type="number" 
                      step="0.01"
                      value={newProduct.price} 
                      onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      placeholder="Preço do produto"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Raridade</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={newProduct.rarity as string}
                      onChange={e => setNewProduct({...newProduct, rarity: e.target.value as Rarity})}
                    >
                      <option value="brainrot">Brainrot</option>
                      <option value="secreto">Secreto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">URL da Imagem</label>
                    <Input 
                      value={newProduct.image} 
                      onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="URL da imagem do produto"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Dinheiro do jogo (ex: 70M, 2B, 1.5T)</label>
                    <Input 
                      value={newProduct.gameValue || ''} 
                      onChange={e => setNewProduct({...newProduct, gameValue: e.target.value})}
                      placeholder="Ex: 70M, 2B, 1.5T"
                    />
                  </div>
                  <Button onClick={handleAddProduct} className="mt-4">Adicionar Produto</Button>
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