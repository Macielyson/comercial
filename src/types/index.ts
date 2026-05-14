export interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  precoVenda: number;
  precoCompra: number;
  descricao: string | null;
  imagemUrl: string | null;
  unidadeMedida: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProdutoInput {
  nome: string;
  quantidade: number;
  precoVenda: number;
  precoCompra: number;
  descricao?: string;
  imagemUrl?: string;
  unidadeMedida: string;
}

export type UnidadeMedida = "UN" | "KG" | "L" | "M" | "CX" | "PC";

export const unidadesMedida = {
  UN: "Unidade",
  KG: "Quilograma",
  L: "Litro",
  M: "Metro",
  CX: "Caixa",
  PC: "Peça",
} as const;
