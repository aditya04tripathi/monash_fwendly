import { PrismaClient, Course, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single course by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const course = await prisma.course.findUnique({
			where: { id },
			include: { events: true, units: true },
		});

		if (!course) {
			return Response.json(
				{ data: null, error: "Course not found" } as ApiResponse<Course>,
				{ status: 404 }
			);
		}

		return Response.json({ data: course, error: null } as ApiResponse<Course>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching course:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch course" } as ApiResponse<Course>,
			{ status: 500 }
		);
	}
}

// PUT update a course (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const courseData: Prisma.CourseUpdateInput = await request.json();

		const updatedCourse = await prisma.course.update({
			where: { id },
			data: courseData,
		});

		return Response.json(
			{ data: updatedCourse, error: null } as ApiResponse<Course>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating course:", error);
		return Response.json(
			{ data: null, error: "Failed to update course" } as ApiResponse<Course>,
			{ status: 500 }
		);
	}
}

// PATCH partially update a course
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const courseData: Prisma.CourseUpdateInput = await request.json();

		const updatedCourse = await prisma.course.update({
			where: { id },
			data: courseData,
		});

		return Response.json(
			{ data: updatedCourse, error: null } as ApiResponse<Course>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching course:", error);
		return Response.json(
			{ data: null, error: "Failed to patch course" } as ApiResponse<Course>,
			{ status: 500 }
		);
	}
}

// DELETE a course
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.course.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting course:", error);
		return Response.json(
			{ data: null, error: "Failed to delete course" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
