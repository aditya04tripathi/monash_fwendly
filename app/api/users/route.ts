import { PrismaClient, User, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

export async function GET() {
	try {
		const users = await prisma.user.findMany();
		return Response.json({ data: users, error: null } as ApiResponse<User[]>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching users:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch users" } as ApiResponse<User[]>,
			{ status: 500 }
		);
	}
}

// POST create a new user
export async function POST(request: NextRequest) {
	try {
		const userData: Prisma.UserCreateInput = await request.json();
		const newUser = await prisma.user.create({
			data: userData,
		});
		return Response.json({ data: newUser, error: null } as ApiResponse<User>, {
			status: 201,
		});
	} catch (error) {
		console.error("Error creating user:", error);
		return Response.json(
			{ data: null, error: "Failed to create user" } as ApiResponse<User>,
			{ status: 500 }
		);
	}
}
