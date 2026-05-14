"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { produtoSchema, type ProdutoFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Package, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

interface ProdutoFormProps {
  initialData?: ProdutoFormData & { id?: string };
  onSubmit: (data: ProdutoFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export function ProdutoForm({
  initialData,
  onSubmit,
  isSubmitting,
}: ProdutoFormProps) {
  const [previewImage, setPreviewImage] = useState(
    initialData?.imagemUrl ?? "",
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProdutoFormData>({
    resolver: zodResolver(produtoSchema),
    defaultValues: initialData || {
      nome: "",
      quantidade: 0,
      precoVenda: 0,
      precoCompra: 0,
      descricao: "",
      imagemUrl: "",
      unidadeMedida: "UN",
    },
  });

  const precoCompra = watch("precoCompra");
  const precoVenda = watch("precoVenda");
  const margem =
    precoCompra && precoVenda
      ? ((precoVenda - precoCompra) / precoCompra) * 100
      : 0;

  const margemColor =
    margem >= 30
      ? "text-green-600"
      : margem >= 15
        ? "text-yellow-600"
        : "text-red-600";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna da Esquerda - Imagem e Informações Básicas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Informações do Produto</h3>

              <div>
                <Label htmlFor="nome">Nome do Produto *</Label>
                <Input
                  id="nome"
                  {...register("nome")}
                  placeholder="Ex: Camiseta Premium"
                  className="mt-1"
                />
                {errors.nome && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.nome.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  {...register("descricao")}
                  placeholder="Descreva detalhes do produto..."
                  rows={4}
                  className="mt-1"
                />
                {errors.descricao && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.descricao.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unidadeMedida">Unidade de Medida *</Label>
                  <Select
                    onValueChange={(value) =>
                      setValue(
                        "unidadeMedida",
                        value as ProdutoFormData["unidadeMedida"],
                      )
                    }
                    defaultValue={initialData?.unidadeMedida}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UN">Unidade (UN)</SelectItem>
                      <SelectItem value="KG">Quilograma (KG)</SelectItem>
                      <SelectItem value="L">Litro (L)</SelectItem>
                      <SelectItem value="M">Metro (M)</SelectItem>
                      <SelectItem value="CX">Caixa (CX)</SelectItem>
                      <SelectItem value="PC">Peça (PC)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.unidadeMedida && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.unidadeMedida.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="quantidade">Quantidade em Estoque *</Label>
                  <Input
                    id="quantidade"
                    type="number"
                    {...register("quantidade", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.quantidade && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.quantidade.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Preços e Lucratividade</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="precoCompra">Preço de Compra (R$) *</Label>
                  <Input
                    id="precoCompra"
                    type="number"
                    step="0.01"
                    {...register("precoCompra", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.precoCompra && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.precoCompra.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="precoVenda">Preço de Venda (R$) *</Label>
                  <Input
                    id="precoVenda"
                    type="number"
                    step="0.01"
                    {...register("precoVenda", { valueAsNumber: true })}
                    className="mt-1"
                  />
                  {errors.precoVenda && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.precoVenda.message}
                    </p>
                  )}
                </div>
              </div>

              {precoCompra > 0 && precoVenda > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Margem de Lucro:
                    </span>
                    <span className={`font-bold text-lg ${margemColor}`}>
                      {margem.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Lucro por unidade:</span>
                    <span className="font-medium text-green-600">
                      R$ {(precoVenda - precoCompra).toFixed(2)}
                    </span>
                  </div>
                  {margem < 15 && (
                    <div className="flex items-center gap-2 mt-3 text-yellow-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>
                        Margem baixa! Considere ajustar o preço de venda
                      </span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Coluna da Direita - Imagem */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Imagem do Produto</h3>

              <div>
                <Label htmlFor="imagemUrl">URL da Imagem</Label>
                <Input
                  id="imagemUrl"
                  {...register("imagemUrl")}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="mt-1"
                  onChange={(e) => setPreviewImage(e.target.value)}
                />
                {errors.imagemUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.imagemUrl.message}
                  </p>
                )}
              </div>

              {previewImage && (
                <div className="mt-4">
                  <div className="relative rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/api/placeholder/400/300";
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Preview da imagem
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : initialData?.id ? (
                    "Atualizar Produto"
                  ) : (
                    "Criar Produto"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
