import React, { useState } from "react";
import { BuscaProduto } from "./components/BuscaProduto";
import { Carrinho } from "./components/Carrinho";
import type { Produto, ItemCarrinho } from "./types";
import "./App.css";

function App() {
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
  const [descontoGeral, setDescontoGeral] = useState<number>(0);

  const adicionarAoCarrinho = (produto: Produto, quantidade: number = 1) => {
    setItensCarrinho((itensAtuais) => {
      const itemExistente = itensAtuais.find((item) => item.produto.id === produto.id);

      if (itemExistente) {
        return itensAtuais.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + quantidade,
                subtotal: (item.quantidade + quantidade) * produto.preco,
              }
            : item
        );
      } else {
        return [
          ...itensAtuais,
          {
            produto,
            quantidade: quantidade,
            subtotal: produto.preco * quantidade,
          },
        ];
      }
    });
  };

  const removerItem = (index: number) => {
    setItensCarrinho((itensAtuais) => itensAtuais.filter((_, i) => i !== index));
  };

  const alterarQuantidade = (index: number, novaQuantidade: number) => {
    if (novaQuantidade <= 0) return;

    setItensCarrinho((itensAtuais) =>
      itensAtuais.map((item, i) =>
        i === index
          ? {
              ...item,
              quantidade: novaQuantidade,
              subtotal: novaQuantidade * item.produto.preco,
            }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItensCarrinho([]);
    setDescontoGeral(0);
  };

  const aplicarDesconto = (index: number, percentual: number) => {
    setItensCarrinho((itensAtuais) =>
      itensAtuais.map((item, i) =>
        i === index
          ? {
              ...item,
              desconto: percentual,
              subtotal: item.produto.preco * item.quantidade * (1 - percentual / 100),
            }
          : item
      )
    );
  };

  const aplicarDescontoGeral = (percentual: number) => {
    setDescontoGeral(percentual);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="bg-blue-800 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">PDV Comercial</h1>
              <p className="text-blue-200 mt-1">Sistema de Ponto de Venda</p>
            </div>
            <div className="text-right">
              <p className="text-blue-200">Data: {new Date().toLocaleDateString("pt-BR")}</p>
              <p className="text-blue-200">Hora: {new Date().toLocaleTimeString("pt-BR")}</p>
            </div>
          </div>
        </header>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna da Busca */}
          <div>
            <BuscaProduto onAdicionarAoCarrinho={adicionarAoCarrinho} />

            {/* Informações de Uso */}
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
              <h3 className="text-blue-800 font-semibold mb-2">Como usar:</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Digite o código, código de barras ou descrição do produto</li>
                <li>• Para adicionar quantidade: digite "2*001" (2 unidades do produto 001)</li>
                <li>
                  • Pressione <strong>Enter</strong> para adicionar ao carrinho
                </li>
                <li>• Ajuste as quantidades diretamente no carrinho</li>
                <li>
                  • Pressione <strong>Ctrl + F6</strong> para desconto individual
                </li>
                <li>
                  • Pressione <strong>Ctrl + F7</strong> para desconto geral
                </li>
                <li>• Use o campo "Desconto Geral" para aplicar desconto em toda a compra</li>
              </ul>
            </div>
          </div>

          {/* Coluna do Carrinho */}
          <div>
            <Carrinho
              itens={itensCarrinho}
              onRemoverItem={removerItem}
              onAlterarQuantidade={alterarQuantidade}
              onLimparCarrinho={limparCarrinho}
              onAplicarDesconto={aplicarDesconto}
              onAplicarDescontoGeral={aplicarDescontoGeral}
              descontoGeral={descontoGeral}
            />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-blue-600">
          <p>&copy; 2024 PDV Comercial - Sistema de Ponto de Venda</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
