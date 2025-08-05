import React, { useState, useEffect } from "react";

interface ModalDescontoProps {
  isOpen: boolean;
  onClose: () => void;
  onAplicarDesconto: (percentual: number) => void;
  itemIndex: number;
  itemDescricao: string;
}

export const ModalDesconto: React.FC<ModalDescontoProps> = ({ isOpen, onClose, onAplicarDesconto, itemIndex, itemDescricao }) => {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-800">Aplicar Desconto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            <strong>Item:</strong> {itemDescricao}
          </p>
          <p className="text-gray-600">
            <strong>Posição:</strong> {itemIndex + 1}º item
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="percentual" className="block text-sm font-medium text-gray-700 mb-2">
              Percentual de Desconto (%)
            </label>
            <input
              type="number"
              id="percentual"
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

          <div className="flex space-x-3">
            <button type="button" onClick={onClose} className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 font-medium">
              Cancelar
            </button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium">
              Aplicar Desconto
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <p>
            • Pressione <kbd className="bg-gray-200 px-1 rounded">Esc</kbd> para cancelar
          </p>
          <p>• Percentual válido: 0% a 100%</p>
        </div>
      </div>
    </div>
  );
};
