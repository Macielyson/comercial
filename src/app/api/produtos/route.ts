import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { produtoSchema } from "@/lib/validations";

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(produtos);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = produtoSchema.parse(body);
    const produto = await prisma.produto.create({
      data: validatedData,
    });
    return NextResponse.json(produto, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Erro desconhecido" }, { status: 400 });
  }
}
