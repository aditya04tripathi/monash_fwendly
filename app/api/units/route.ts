import { PrismaClient, Unit, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all units
export async function GET() {
	try {
		const units = await prisma.unit.findMany({
			include: { course: true },
		});
		return Response.json({ data: units, error: null } as ApiResponse<Unit[]>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching units:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch units" } as ApiResponse<Unit[]>,
			{ status: 500 }
		);
	}
}

// POST create a new unit
export async function POST(request: NextRequest) {
	try {
		const unitData: Prisma.UnitCreateInput = await request.json();
		const newUnit = await prisma.unit.create({
			data: unitData,
		});
		return Response.json({ data: newUnit, error: null } as ApiResponse<Unit>, {
			status: 201,
		});
	} catch (error) {
		console.error("Error creating unit:", error);
		return Response.json(
			{ data: null, error: "Failed to create unit" } as ApiResponse<Unit>,
			{ status: 500 }
		);
	}
}
