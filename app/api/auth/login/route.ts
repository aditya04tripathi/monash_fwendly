import { PrismaClient, User } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		if (!email || !password) {
			return Response.json(
				{
					data: null,
					error: "Email and password are required",
				} as ApiResponse<User>,
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return Response.json(
				{ data: null, error: "Invalid email or password" } as ApiResponse<User>,
				{ status: 401 }
			);
		}

		// Verify password with bcrypt
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return Response.json(
				{ data: null, error: "Invalid email or password" } as ApiResponse<User>,
				{ status: 401 }
			);
		}

		return Response.json({ data: user, error: null } as ApiResponse<User>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error during login:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to authenticate user",
			} as ApiResponse<User>,
			{ status: 500 }
		);
	}
}
