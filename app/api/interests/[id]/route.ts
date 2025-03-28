import { PrismaClient, Interest, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single interest by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const interest = await prisma.interest.findUnique({
			where: { id },
			include: { users: true, tags: true },
		});

		if (!interest) {
			return Response.json(
				{ data: null, error: "Interest not found" } as ApiResponse<Interest>,
				{ status: 404 }
			);
		}

		return Response.json(
			{ data: interest, error: null } as ApiResponse<Interest>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching interest:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to fetch interest",
			} as ApiResponse<Interest>,
			{ status: 500 }
		);
	}
}

// PUT update an interest (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const interestData: Prisma.InterestUpdateInput = await request.json();

		const updatedInterest = await prisma.interest.update({
			where: { id },
			data: interestData,
		});

		return Response.json(
			{ data: updatedInterest, error: null } as ApiResponse<Interest>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating interest:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to update interest",
			} as ApiResponse<Interest>,
			{ status: 500 }
		);
	}
}

// PATCH partially update an interest
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const interestData: Prisma.InterestUpdateInput = await request.json();

		const updatedInterest = await prisma.interest.update({
			where: { id },
			data: interestData,
		});

		return Response.json(
			{ data: updatedInterest, error: null } as ApiResponse<Interest>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching interest:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to patch interest",
			} as ApiResponse<Interest>,
			{ status: 500 }
		);
	}
}

// DELETE an interest
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.interest.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting interest:", error);
		return Response.json(
			{ data: null, error: "Failed to delete interest" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
