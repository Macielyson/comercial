"use client";

import { Produto } from "@/types";
import { unidadesMedida } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ProdutoCardProps {
  produto: Produto;
  onDelete: (id: string) => Promise<void>;
}

export function ProdutoCard({ produto, onDelete }: ProdutoCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Tem certeza que deseja excluir ${produto.nome}?`)) {
      setIsDeleting(true);
      await onDelete(produto.id);
      setIsDeleting(false);
    }
  };

  const margemLucro = (
    ((produto.precoVenda - produto.precoCompra) / produto.precoCompra) *
    100
  ).toFixed(1);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-gray-100">
        {produto.imagemUrl ? (
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="material-icons text-gray-400 text-6xl">image</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{produto.nome}</h3>
          <span className="text-sm text-gray-500">
            {produto.quantidade}{" "}
            {
              unidadesMedida[
                produto.unidadeMedida as keyof typeof unidadesMedida
              ]
            }
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Preço Compra:</span>
            <span className="font-medium">
              R$ {produto.precoCompra.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Preço Venda:</span>
            <span className="font-medium text-green-600">
              R$ {produto.precoVenda.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Margem:</span>
            <span
              className={`font-medium ${parseFloat(margemLucro) > 0 ? "text-green-600" : "text-red-600"}`}
            >
              {margemLucro}%
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/produtos/editar/${produto.id}`)}
            className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">edit</span>
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span className="material-icons text-sm">delete</span>
            {isDeleting ? "..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
