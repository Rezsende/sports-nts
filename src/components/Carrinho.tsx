import React from 'react';
import { ItemCarrinho } from '../types';

interface CarrinhoProps {
  itens: ItemCarrinho[];
  onRemoverItem: (index: number) => void;
  onAlterarQuantidade: (index: number, novaQuantidade: number) => void;
}

export const Carrinho: React.FC<CarrinhoProps> = ({ 
  itens, 
  onRemoverItem, 
  onAlterarQuantidade 
}) => {
  const total = itens.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        Carrinho de Compras ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
      </h2>
      
      {itens.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Carrinho vazio</p>
          <p className="text-sm">Use a busca acima para adicionar produtos</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-50 text-blue-800">
                  <th className="text-left p-3 font-semibold">Descrição</th>
                  <th className="text-left p-3 font-semibold">Código de Barras</th>
                  <th className="text-center p-3 font-semibold">Qtd</th>
                  <th className="text-right p-3 font-semibold">Valor Unit.</th>
                  <th className="text-right p-3 font-semibold">Subtotal</th>
                  <th className="text-center p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-800">{item.produto.descricao}</p>
                        <p className="text-sm text-gray-500">Cód: {item.produto.codigo}</p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 font-mono text-sm">
                      {item.produto.codigoBarras}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onAlterarQuantidade(index, Math.max(1, item.quantidade - 1))}
                          className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantidade}</span>
                        <button
                          onClick={() => onAlterarQuantidade(index, item.quantidade + 1)}
                          className="w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-right font-semibold text-gray-800">
                      R$ {item.produto.preco.toFixed(2)}
                    </td>
                    <td className="p-3 text-right font-bold text-blue-600 text-lg">
                      R$ {item.subtotal.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => onRemoverItem(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 pt-4 border-t-2 border-blue-200">
            <div className="flex justify-between items-center">
              <div className="text-lg text-gray-700">
                <span className="font-semibold">Total de itens: </span>
                {itens.reduce((acc, item) => acc + item.quantidade, 0)}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-800">
                  TOTAL: R$ {total.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold text-lg">
                Finalizar Venda
              </button>
              <button className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 font-semibold">
                Limpar Carrinho
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};