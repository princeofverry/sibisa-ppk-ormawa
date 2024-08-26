import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const body = await request.json();
    const { besi, kaca, kertas, plastik, sterofoam } = body;

    // Validasi input
    if (
      typeof besi !== "number" ||
      typeof kaca !== "number" ||
      typeof kertas !== "number" ||
      typeof plastik !== "number" ||
      typeof sterofoam !== "number" ||
      besi < 0 ||
      kaca < 0 ||
      kertas < 0 ||
      plastik < 0 ||
      sterofoam < 0
    ) {
      return NextResponse.json(
        { error: "Invalid values for waste types" },
        { status: 400 }
      );
    }

    const totalWeight = besi + kaca + kertas + plastik + sterofoam;
    const totalPoints =
      besi * 5000 +
      kaca * 4000 +
      kertas * 3000 +
      plastik * 2000 +
      sterofoam * 1000;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        besi,
        kaca,
        kertas,
        plastik,
        sterofoam,
        totalWeight,
        totalPoints,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10); // Konversi id ke number

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    // Menghapus user berdasarkan ID
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
