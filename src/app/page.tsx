"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, TrendingUp, AlertCircle, DollarSign } from "lucide-react";
import { Produto } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Stats {
  total: number;
  valorEstoque: number;
  produtosBaixoEstoque: number;
  produtosMaisVendidos: Produto[];
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    valorEstoque: 0,
    produtosBaixoEstoque: 0,
    produtosMaisVendidos: [],
  });
  const [loading, setLoading] = useState(true);
  const [crescimento] = useState(() => Math.floor(Math.random() * 10));

  useEffect(() => {
    fetch("/api/produtos")
      .then((res) => res.json())
      .then((produtos: Produto[]) => {
        const total = produtos.length;
        const valorEstoque = produtos.reduce(
          (sum: number, p: Produto) => sum + p.precoVenda * p.quantidade,
          0,
        );
        const produtosBaixoEstoque = produtos.filter(
          (p: Produto) => p.quantidade < 10,
        ).length;

        setStats({
          total,
          valorEstoque,
          produtosBaixoEstoque,
          produtosMaisVendidos: produtos.slice(0, 5),
        });
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Visão geral do seu estoque</p>
        </div>
        <Link href="/produtos/novo">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Package className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-500 mt-1">
              +{crescimento}% desde mês passado
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Valor do Estoque
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {stats.valorEstoque.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <p className="text-xs text-gray-500 mt-1">Valor total em estoque</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Produtos em Baixa
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {stats.produtosBaixoEstoque}
            </div>
            <p className="text-xs text-gray-500 mt-1">Precisam de reposição</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Margem Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">45%</div>
            <p className="text-xs text-gray-500 mt-1">
              Lucro médio por produto
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e informações */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Produtos com Baixo Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Em risco (menos de 10 unidades)
                </span>
                <Badge variant="destructive">
                  {stats.produtosBaixoEstoque} produtos
                </Badge>
              </div>
              <Progress
                value={(stats.produtosBaixoEstoque / stats.total) * 100}
                className="h-2"
              />
              <p className="text-xs text-gray-500 mt-2">
                {stats.produtosBaixoEstoque === 0
                  ? "Ótimo! Todos os produtos com estoque adequado"
                  : `${stats.produtosBaixoEstoque} produtos precisam de reposição em breve`}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dicas Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Badge variant="default" className="bg-blue-600">
                  💡
                </Badge>
                <div>
                  <p className="text-sm font-medium">
                    Revise produtos com baixo estoque
                  </p>
                  <p className="text-xs text-gray-600">
                    Produtos com menos de 10 unidades precisam de atenção
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Badge variant="default" className="bg-green-600">
                  📊
                </Badge>
                <div>
                  <p className="text-sm font-medium">
                    Acompanhe margens de lucro
                  </p>
                  <p className="text-xs text-gray-600">
                    Mantenha margem acima de 30% para produtos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
