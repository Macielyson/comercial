import { z } from "zod";

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  quantidade: z
    .number()
    .int("Quantidade deve ser um número inteiro")
    .min(0, "Quantidade não pode ser negativa"),

  precoVenda: z.number().min(0.01, "Preço de venda deve ser maior que 0"),

  precoCompra: z.number().min(0.01, "Preço de compra deve ser maior que 0"),

  descricao: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),

  imagemUrl: z.string().url("URL da imagem inválida").optional().nullable(),

  unidadeMedida: z.enum(["UN", "KG", "L", "M", "CX", "PC"], {
    message: "Unidade de medida inválida",
  }),
});

export type ProdutoFormData = z.infer<typeof produtoSchema>;
