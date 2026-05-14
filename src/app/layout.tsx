import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";
import { Package, Home, Box, Settings, TrendingUp } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Gerenciamento de Produtos",
  description: "Gerencie seu estoque de forma profissional",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r shadow-lg">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-8">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl">EstoquePro</span>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/produtos"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Box className="h-5 w-5" />
                  <span>Produtos</span>
                </Link>
                <Link
                  href="/relatorios"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <TrendingUp className="h-5 w-5" />
                  <span>Relatórios</span>
                </Link>
                <Link
                  href="/configuracoes"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Link>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-8">{children}</div>
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
