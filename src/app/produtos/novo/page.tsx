"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProdutoForm } from "@/components/forms/ProdutoForm";
import type { ProdutoFormData } from "@/lib/validations";

export default function NovoProdutoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProdutoFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push("/produtos");
        router.refresh();
      } else {
        const error = await response.json();
        alert(error.error || "Erro ao criar produto");
      }
    } catch (error) {
      alert("Erro ao criar produto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Novo Produto</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProdutoForm onSubmit={onSubmit} isSubmitting={isSubmitting} />
        </div>
      </div>
    </div>
  );
}
