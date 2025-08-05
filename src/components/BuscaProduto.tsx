import React, { useState } from 'react';
import { Produto } from '../types';
import { produtos } from '../data/produtos';

interface BuscaProdutoProps {
  onAdicionarAoCarrinho: (produto: Produto) => void;
}

export const BuscaProduto: React.FC<BuscaProdutoProps> = ({ onAdicionarAoCarrinho }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [produtoEncontrado, setProdutoEncontrado] = useState<Produto | null>(null);

  const buscarProduto = (termo: string) => {
    if (!termo.trim()) {
      setProdutoEncontrado(null);
      return;
    }

    const produto = produtos.find(p => 
      p.codigo.toLowerCase().includes(termo.toLowerCase()) ||
      p.codigoBarras.includes(termo) ||
      p.descricao.toLowerCase().includes(termo.toLowerCase())
    );

    setProdutoEncontrado(produto || null);
  };

  const handleBusca = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTermoBusca(valor);
    buscarProduto(valor);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && produtoEncontrado) {
      onAdicionarAoCarrinho(produtoEncontrado);
      setTermoBusca('');
      setProdutoEncontrado(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Buscar Produto</h2>
      
      <div className="relative">
        <input
          type="text"
          value={termoBusca}
          onChange={handleBusca}
          onKeyPress={handleKeyPress}
          placeholder="Digite o código, código de barras ou descrição do produto..."
          className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />
        
        {produtoEncontrado && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-blue-300 border-t-0 rounded-b-lg p-4 shadow-lg z-10">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-blue-800">{produtoEncontrado.descricao}</p>
                <p className="text-sm text-gray-600">
                  Código: {produtoEncontrado.codigo} | Código de Barras: {produtoEncontrado.codigoBarras}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">
                  R$ {produtoEncontrado.preco.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">Pressione Enter para adicionar</p>
              </div>
            </div>
          </div>
        )}
        
        {termoBusca && !produtoEncontrado && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-red-300 border-t-0 rounded-b-lg p-4 shadow-lg z-10">
            <p className="text-red-600">Produto não encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
};