import { PrismaClient, Course, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all courses
export async function GET(request: NextRequest) {
	try {
		const courses = await prisma.course.findMany({
			include: { events: true, units: true },
		});
		return Response.json(
			{ data: courses, error: null } as ApiResponse<Course[]>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching courses:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch courses" } as ApiResponse<Course[]>,
			{ status: 500 }
		);
	}
}

// POST create a new course
export async function POST(request: NextRequest) {
	try {
		const courseData: Prisma.CourseCreateInput = await request.json();
		const newCourse = await prisma.course.create({
			data: courseData,
		});
		return Response.json(
			{ data: newCourse, error: null } as ApiResponse<Course>,
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating course:", error);
		return Response.json(
			{ data: null, error: "Failed to create course" } as ApiResponse<Course>,
			{ status: 500 }
		);
	}
}
