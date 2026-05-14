"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProdutoForm } from "@/components/forms/ProdutoForm";
import type { ProdutoFormData } from "@/lib/validations";

export default function EditarProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<ProdutoFormData | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/produtos/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setInitialData(data);
        setLoading(false);
      });
  }, [params.id]);

  const onSubmit = async (data: ProdutoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/produtos/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/produtos");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao atualizar produto");
      }
    } catch (error) {
      alert("Erro ao atualizar produto");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center py-8">Carregando...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Editar Produto</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProdutoForm
            initialData={initialData}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
