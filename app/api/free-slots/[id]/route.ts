import { PrismaClient, FreeSlot, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single free slot by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const freeSlot = await prisma.freeSlot.findUnique({
			where: { id },
			include: { user: true },
		});

		if (!freeSlot) {
			return Response.json(
				{ data: null, error: "Free slot not found" } as ApiResponse<FreeSlot>,
				{ status: 404 }
			);
		}

		return Response.json(
			{ data: freeSlot, error: null } as ApiResponse<FreeSlot>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching free slot:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to fetch free slot",
			} as ApiResponse<FreeSlot>,
			{ status: 500 }
		);
	}
}

// PUT update a free slot (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const freeSlotData: Prisma.FreeSlotUpdateInput = await request.json();

		const updatedFreeSlot = await prisma.freeSlot.update({
			where: { id },
			data: freeSlotData,
		});

		return Response.json(
			{ data: updatedFreeSlot, error: null } as ApiResponse<FreeSlot>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating free slot:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to update free slot",
			} as ApiResponse<FreeSlot>,
			{ status: 500 }
		);
	}
}

// PATCH partially update a free slot
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const freeSlotData: Prisma.FreeSlotUpdateInput = await request.json();

		const updatedFreeSlot = await prisma.freeSlot.update({
			where: { id },
			data: freeSlotData,
		});

		return Response.json(
			{ data: updatedFreeSlot, error: null } as ApiResponse<FreeSlot>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching free slot:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to patch free slot",
			} as ApiResponse<FreeSlot>,
			{ status: 500 }
		);
	}
}

// DELETE a free slot
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.freeSlot.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting free slot:", error);
		return Response.json(
			{ data: null, error: "Failed to delete free slot" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
