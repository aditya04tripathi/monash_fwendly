import { PrismaClient, Unit, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single unit by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const unit = await prisma.unit.findUnique({
			where: { id },
			include: { course: true },
		});

		if (!unit) {
			return Response.json(
				{ data: null, error: "Unit not found" } as ApiResponse<Unit>,
				{ status: 404 }
			);
		}

		return Response.json({ data: unit, error: null } as ApiResponse<Unit>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching unit:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch unit" } as ApiResponse<Unit>,
			{ status: 500 }
		);
	}
}

// PUT update a unit (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const unitData: Prisma.UnitUpdateInput = await request.json();

		const updatedUnit = await prisma.unit.update({
			where: { id },
			data: unitData,
		});

		return Response.json(
			{ data: updatedUnit, error: null } as ApiResponse<Unit>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating unit:", error);
		return Response.json(
			{ data: null, error: "Failed to update unit" } as ApiResponse<Unit>,
			{ status: 500 }
		);
	}
}

// PATCH partially update a unit
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const unitData: Prisma.UnitUpdateInput = await request.json();

		const updatedUnit = await prisma.unit.update({
			where: { id },
			data: unitData,
		});

		return Response.json(
			{ data: updatedUnit, error: null } as ApiResponse<Unit>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching unit:", error);
		return Response.json(
			{ data: null, error: "Failed to patch unit" } as ApiResponse<Unit>,
			{ status: 500 }
		);
	}
}

// DELETE a unit
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.unit.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting unit:", error);
		return Response.json(
			{ data: null, error: "Failed to delete unit" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
