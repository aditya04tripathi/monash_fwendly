import { PrismaClient, Interest, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all interests
export async function GET() {
	try {
		const interests = await prisma.interest.findMany({
			include: { users: true, tags: true },
		});
		return Response.json(
			{ data: interests, error: null } as ApiResponse<Interest[]>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching interests:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch interests" } as ApiResponse<
				Interest[]
			>,
			{ status: 500 }
		);
	}
}

// POST create a new interest
export async function POST(request: NextRequest) {
	try {
		const interestData: Prisma.InterestCreateInput = await request.json();
		const newInterest = await prisma.interest.create({
			data: interestData,
		});
		return Response.json(
			{ data: newInterest, error: null } as ApiResponse<Interest>,
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating interest:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to create interest",
			} as ApiResponse<Interest>,
			{ status: 500 }
		);
	}
}
