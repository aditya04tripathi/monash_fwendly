import { PrismaClient, User, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single user by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				interests: true,
				events: true,
				attendingEvents: true,
				freeSlots: true,
			},
		});

		if (!user) {
			return Response.json(
				{ data: null, error: "User not found" } as ApiResponse<User>,
				{ status: 404 }
			);
		}

		return Response.json({ data: user, error: null } as ApiResponse<User>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching user:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch user" } as ApiResponse<User>,
			{ status: 500 }
		);
	}
}

// PUT update a user (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const userData: Prisma.UserUpdateInput = await request.json();

		const updatedUser = await prisma.user.update({
			where: { id },
			data: userData,
		});

		return Response.json(
			{ data: updatedUser, error: null } as ApiResponse<User>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating user:", error);
		return Response.json(
			{ data: null, error: "Failed to update user" } as ApiResponse<User>,
			{ status: 500 }
		);
	}
}

// PATCH partially update a user
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const userData: Prisma.UserUpdateInput = await request.json();

		const updatedUser = await prisma.user.update({
			where: { id },
			data: userData,
		});

		return Response.json(
			{ data: updatedUser, error: null } as ApiResponse<User>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching user:", error);
		return Response.json(
			{ data: null, error: "Failed to patch user" } as ApiResponse<User>,
			{ status: 500 }
		);
	}
}

// DELETE a user
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.user.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting user:", error);
		return Response.json(
			{ data: null, error: "Failed to delete user" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
