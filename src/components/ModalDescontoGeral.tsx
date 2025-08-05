import React, { useState, useEffect } from "react";

interface ModalDescontoGeralProps {
  isOpen: boolean;
  onClose: () => void;
  onAplicarDesconto: (percentual: number) => void;
  subtotal: number;
}

export const ModalDescontoGeral: React.FC<ModalDescontoGeralProps> = ({ isOpen, onClose, onAplicarDesconto, subtotal }) => {
  const [percentual, setPercentual] = useState("10");

  useEffect(() => {
    if (isOpen) {
      setPercentual("10");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = parseFloat(percentual);
    if (valor >= 0 && valor <= 100) {
      onAplicarDesconto(valor);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const calcularDesconto = () => {
    const valor = parseFloat(percentual);
    if (isNaN(valor) || valor < 0 || valor > 100) return { valorDesconto: 0, totalFinal: subtotal };

    const valorDesconto = (subtotal * valor) / 100;
    const totalFinal = subtotal - valorDesconto;
    return { valorDesconto, totalFinal };
  };

  const { valorDesconto, totalFinal } = calcularDesconto();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-800">Desconto Geral</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            <strong>Subtotal da Compra:</strong> R$ {subtotal.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="percentualGeral" className="block text-sm font-medium text-gray-700 mb-2">
              Percentual de Desconto Geral (%)
            </label>
            <input
              type="number"
              id="percentualGeral"
              value={percentual}
              onChange={(e) => setPercentual(e.target.value)}
              onKeyDown={handleKeyDown}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o percentual (0-100)"
              autoFocus
            />
          </div>

          {/* Preview do desconto */}
          {percentual && !isNaN(parseFloat(percentual)) && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <div className="text-sm text-blue-800">
                <p>
                  <strong>Desconto:</strong> R$ {valorDesconto.toFixed(2)}
                </p>
                <p>
                  <strong>Total Final:</strong> R$ {totalFinal.toFixed(2)}
                </p>
                <p>
                  <strong>Economia:</strong> R$ {valorDesconto.toFixed(2)}
                </p>
              </div>
            </div>
          )}

          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium">
              Cancelar
            </button>
            <button type="submit" className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 font-medium">
              Aplicar Desconto
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <p>
            • Pressione <kbd className="bg-gray-200 px-1 rounded">Esc</kbd> para cancelar
          </p>
          <p>• Percentual válido: 0% a 100%</p>
          <p>• O desconto será aplicado em toda a compra</p>
        </div>
      </div>
    </div>
  );
};
