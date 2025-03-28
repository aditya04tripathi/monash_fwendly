import { PrismaClient, FreeSlot, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all free slots
export async function GET() {
	try {
		const freeSlots = await prisma.freeSlot.findMany({
			include: { user: true },
		});
		return Response.json(
			{ data: freeSlots, error: null } as ApiResponse<FreeSlot[]>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching free slots:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch free slots" } as ApiResponse<
				FreeSlot[]
			>,
			{ status: 500 }
		);
	}
}

// POST create a new free slot
export async function POST(request: NextRequest) {
	try {
		const freeSlotData: Prisma.FreeSlotCreateInput = await request.json();
		const newFreeSlot = await prisma.freeSlot.create({
			data: freeSlotData,
		});
		return Response.json(
			{ data: newFreeSlot, error: null } as ApiResponse<FreeSlot>,
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating free slot:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to create free slot",
			} as ApiResponse<FreeSlot>,
			{ status: 500 }
		);
	}
}
