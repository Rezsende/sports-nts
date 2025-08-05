import React, { useState, useEffect } from "react";
import type { ItemCarrinho } from "../types";
import { ModalDesconto } from "./ModalDesconto";
import { ModalDescontoGeral } from "./ModalDescontoGeral";

interface CarrinhoProps {
  itens: ItemCarrinho[];
  onRemoverItem: (index: number) => void;
  onAlterarQuantidade: (index: number, novaQuantidade: number) => void;
  onLimparCarrinho: () => void;
  onAplicarDesconto: (index: number, desconto: number) => void;
  onAplicarDescontoGeral: (percentual: number) => void;
  descontoGeral?: number;
}

export const Carrinho: React.FC<CarrinhoProps> = ({
  itens,
  onRemoverItem,
  onAlterarQuantidade,
  onLimparCarrinho,
  onAplicarDesconto,
  onAplicarDescontoGeral,
  descontoGeral = 0,
}) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [modalDescontoGeralAberto, setModalDescontoGeralAberto] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState<number | null>(null);

  // Função para calcular subtotal sem desconto geral
  const calcularSubtotal = () => {
    return itens.reduce((acc, item) => acc + item.subtotal, 0);
  };

  // Função para calcular total com desconto geral
  const calcularTotalComDesconto = () => {
    const subtotal = calcularSubtotal();
    if (descontoGeral > 0) {
      return subtotal * (1 - descontoGeral / 100);
    }
    return subtotal;
  };

  const subtotal = calcularSubtotal();
  const total = calcularTotalComDesconto();

  // Listener para Ctrl + F6 e Ctrl + F7
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "F6") {
        e.preventDefault();
        if (itens.length > 0) {
          // Abrir modal para o primeiro item ou próximo item
          const proximoItem = itemSelecionado === null ? 0 : (itemSelecionado + 1) % itens.length;
          setItemSelecionado(proximoItem);
          setModalAberto(true);
        }
      } else if (e.ctrlKey && e.key === "F7") {
        e.preventDefault();
        if (itens.length > 0) {
          // Abrir modal de desconto geral
          setModalDescontoGeralAberto(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [itens.length, itemSelecionado]);

  const abrirModalDesconto = (index: number) => {
    setItemSelecionado(index);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemSelecionado(null);
  };

  const fecharModalDescontoGeral = () => {
    setModalDescontoGeralAberto(false);
  };

  const aplicarDescontoViaModal = (percentual: number) => {
    if (itemSelecionado !== null) {
      onAplicarDesconto(itemSelecionado, percentual);
    }
  };

  const aplicarDescontoGeralViaModal = (percentual: number) => {
    onAplicarDescontoGeral(percentual);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">
        Carrinho de Compras ({itens.length} {itens.length === 1 ? "item" : "itens"})
      </h2>

      {/* Atalhos de Desconto */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4 rounded">
        <p className="text-yellow-800 text-sm">
          <strong>Atalhos:</strong>
          <kbd className="bg-yellow-200 px-2 py-1 rounded text-xs mx-1">Ctrl + F6</kbd> para desconto individual |
          <kbd className="bg-yellow-200 px-2 py-1 rounded text-xs mx-1">Ctrl + F7</kbd> para desconto geral
        </p>
      </div>

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
                  <th className="text-center p-3 font-semibold">Desconto</th>
                  <th className="text-center p-3 font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item, index) => (
                  <tr key={index} className={`border-b border-gray-200 hover:bg-gray-50 ${item.desconto ? "bg-yellow-50" : ""}`}>
                    <td className="p-3">
                      <div>
                        <p className="font-medium text-gray-800">{item.produto.descricao}</p>
                        <p className="text-sm text-gray-500">Cód: {item.produto.codigo}</p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600 font-mono text-sm">{item.produto.codigoBarras}</td>
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
                    <td className="p-3 text-right font-semibold text-gray-800">R$ {item.produto.preco.toFixed(2)}</td>
                    <td className="p-3 text-right font-bold text-blue-600 text-lg">R$ {item.subtotal.toFixed(2)}</td>
                    <td className="p-3 text-center">
                      {item.desconto ? (
                        <div className="flex flex-col items-center space-y-1">
                          <span className="text-green-600 font-bold">-{item.desconto}%</span>
                          <button onClick={() => onAplicarDesconto(index, 0)} className="text-red-500 text-xs hover:text-red-700">
                            Remover
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => abrirModalDesconto(index)} className="text-blue-500 text-xs hover:text-blue-700">
                          Aplicar
                        </button>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => onRemoverItem(index)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-4 border-t-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg text-gray-700">
                <span className="font-semibold">Total de itens: </span>
                {itens.reduce((acc, item) => acc + item.quantidade, 0)}
              </div>
              <div className="text-right">
                {itens.some((item) => item.desconto) && <p className="text-sm text-green-600">Descontos aplicados em {itens.filter((item) => item.desconto).length} item(s)</p>}
                <p className="text-lg font-semibold text-gray-700">Subtotal: R$ {subtotal.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div></div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-800">TOTAL: R$ {total.toFixed(2)}</p>
                {descontoGeral > 0 && <p className="text-sm text-green-600">Economia: R$ {(subtotal - total).toFixed(2)}</p>}
              </div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold text-lg">Finalizar Venda</button>
              <button onClick={onLimparCarrinho} className="bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 font-semibold">
                Limpar Carrinho
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal de Desconto Individual */}
      <ModalDesconto
        isOpen={modalAberto}
        onClose={fecharModal}
        onAplicarDesconto={aplicarDescontoViaModal}
        itemIndex={itemSelecionado || 0}
        itemDescricao={itemSelecionado !== null ? itens[itemSelecionado]?.produto.descricao || "" : ""}
      />

      {/* Modal de Desconto Geral */}
      <ModalDescontoGeral isOpen={modalDescontoGeralAberto} onClose={fecharModalDescontoGeral} onAplicarDesconto={aplicarDescontoGeralViaModal} subtotal={subtotal} />
    </div>
  );
};
