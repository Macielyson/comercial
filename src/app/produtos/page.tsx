"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Package,
  AlertCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Produto {
  id: string;
  nome: string;
  quantidade: number;
  precoVenda: number;
  precoCompra: number;
  descricao: string | null;
  imagemUrl: string | null;
  unidadeMedida: string;
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // const [filteredProdutos, setFilteredProdutos] = useState<Produto[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredProdutos = useMemo(() => {
    return produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [produtos, searchTerm]);

  const fetchProdutos = async () => {
    const res = await fetch("/api/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/produtos/${deleteId}`, { method: "DELETE" });
      await fetchProdutos();
      setDeleteId(null);
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  useEffect(() => {
    const loadProdutos = async () => {
      try {
        const res = await fetch("/api/produtos");
        const data = await res.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProdutos();
  }, []);

  const getStatusBadge = (quantidade: number) => {
    if (quantidade === 0) return <Badge variant="destructive">Esgotado</Badge>;
    if (quantidade < 10)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Baixo Estoque
        </Badge>
      );
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Em Estoque
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600 mt-2">
            Gerencie seu catálogo de produtos
          </p>
        </div>
        <Link href="/produtos/novo">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar produtos por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Produtos Grid */}
      {filteredProdutos.length === 0 ? (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Tente buscar por outro termo"
                  : "Comece cadastrando seu primeiro produto"}
              </p>
              {!searchTerm && (
                <Link href="/produtos/novo">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Produto
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProdutos.map((produto) => (
            <Card
              key={produto.id}
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Imagem */}
              <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
                {produto.imagemUrl ? (
                  <img
                    src={produto.imagemUrl}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-16 w-16 text-blue-300" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  {getStatusBadge(produto.quantidade)}
                </div>
              </div>

              {/* Conteúdo */}
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                    {produto.nome}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {produto.descricao || "Sem descrição"}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Quantidade:</span>
                    <span className="font-medium">{produto.quantidade} un</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Preço Venda:</span>
                    <span className="font-bold text-green-600">
                      R$ {produto.precoVenda.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Margem:</span>
                    <span className="flex items-center gap-1 text-purple-600">
                      <TrendingUp className="h-3 w-3" />
                      {(
                        ((produto.precoVenda - produto.precoCompra) /
                          produto.precoCompra) *
                        100
                      ).toFixed(0)}
                      %
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/produtos/editar/${produto.id}`}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => setDeleteId(produto.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Confirmação */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
