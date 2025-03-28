import { PrismaClient, User, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
	try {
		const userData: Prisma.UserCreateInput = await request.json();

		if (
			!userData.name ||
			!userData.email ||
			!userData.password ||
			!userData.studentId ||
			!userData.startYear ||
			!userData.endYear
		) {
			return Response.json(
				{ data: null, error: "Missing required fields" } as ApiResponse<User>,
				{ status: 400 }
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: { email: userData.email },
		});

		if (existingUser) {
			return Response.json(
				{
					data: null,
					error: "User with this email already exists",
				} as ApiResponse<User>,
				{ status: 409 }
			);
		}

		const existingStudentId = await prisma.user.findUnique({
			where: { studentId: userData.studentId },
		});

		if (existingStudentId) {
			return Response.json(
				{
					data: null,
					error: "User with this student ID already exists",
				} as ApiResponse<User>,
				{ status: 409 }
			);
		}

		// Hash the password before storing
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(userData.password, salt);

		const user = await prisma.user.create({
			data: {
				name: userData.name,
				email: userData.email,
				password: hashedPassword,
				studentId: userData.studentId,
				startYear: Number(userData.startYear),
				endYear: Number(userData.endYear),
			},
		});

		return Response.json(
			{
				data: user,
				error: null,
			} as ApiResponse<User>,
			{
				status: 201,
			}
		);
	} catch (error) {
		console.error("Error registering user:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to register user",
			} as ApiResponse<User>,
			{ status: 500 }
		);
	}
}
