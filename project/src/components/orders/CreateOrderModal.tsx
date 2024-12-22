import React, { lazy, Suspense } from 'react';
import { X } from 'lucide-react';

const CreateOrderModal = lazy(() => import('./CreateOrderModal'));

interface CreateOrderModalProps {
  onClose: () => void;
}

function CreateOrderModalComponent({ onClose }: CreateOrderModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Novo Pedido</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cliente
              </label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option value="">Selecione um cliente</option>
                {/* Add customer options */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Produtos
              </label>
              <div className="mt-1 p-4 border border-gray-300 rounded-md">
                {/* Add product selection interface */}
                <button type="button" className="text-blue-600 hover:text-blue-700 text-sm">
                  + Adicionar Produto
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Forma de Pagamento
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="">Selecione</option>
                  <option value="credit">Cartão de Crédito</option>
                  <option value="pix">PIX</option>
                  <option value="bank">Transferência Bancária</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  <option value="pending">Pendente</option>
                  <option value="processing">Em Processamento</option>
                  <option value="completed">Concluído</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Observações
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Adicione observações sobre o pedido..."
              />
            </div>
          </form>
        </div>

        <div className="flex items-center justify-end gap-2 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderComponent() {
  return (
    <Suspense fallback={<div>Carregando modal de pedido...</div>}>
      <CreateOrderModalComponent />
    </Suspense>
  );
}