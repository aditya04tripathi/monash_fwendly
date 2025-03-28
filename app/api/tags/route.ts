import { PrismaClient, Tag, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all tags
export async function GET() {
	try {
		const tags = await prisma.tag.findMany({
			include: { interests: true, events: true },
		});
		return Response.json({ data: tags, error: null } as ApiResponse<Tag[]>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching tags:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch tags" } as ApiResponse<Tag[]>,
			{ status: 500 }
		);
	}
}

// POST create a new tag
export async function POST(request: NextRequest) {
	try {
		const tagData: Prisma.TagCreateInput = await request.json();
		const newTag = await prisma.tag.create({
			data: tagData,
		});
		return Response.json({ data: newTag, error: null } as ApiResponse<Tag>, {
			status: 201,
		});
	} catch (error) {
		console.error("Error creating tag:", error);
		return Response.json(
			{ data: null, error: "Failed to create tag" } as ApiResponse<Tag>,
			{ status: 500 }
		);
	}
}
