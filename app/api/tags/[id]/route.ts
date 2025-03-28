import { PrismaClient, Tag, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single tag by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const tag = await prisma.tag.findUnique({
			where: { id },
			include: { interests: true, events: true },
		});

		if (!tag) {
			return Response.json(
				{ data: null, error: "Tag not found" } as ApiResponse<Tag>,
				{ status: 404 }
			);
		}

		return Response.json({ data: tag, error: null } as ApiResponse<Tag>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching tag:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch tag" } as ApiResponse<Tag>,
			{ status: 500 }
		);
	}
}

// PUT update a tag (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const tagData: Prisma.TagUpdateInput = await request.json();

		const updatedTag = await prisma.tag.update({
			where: { id },
			data: tagData,
		});

		return Response.json(
			{ data: updatedTag, error: null } as ApiResponse<Tag>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating tag:", error);
		return Response.json(
			{ data: null, error: "Failed to update tag" } as ApiResponse<Tag>,
			{ status: 500 }
		);
	}
}

// PATCH partially update a tag
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const tagData: Prisma.TagUpdateInput = await request.json();

		const updatedTag = await prisma.tag.update({
			where: { id },
			data: tagData,
		});

		return Response.json(
			{ data: updatedTag, error: null } as ApiResponse<Tag>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching tag:", error);
		return Response.json(
			{ data: null, error: "Failed to patch tag" } as ApiResponse<Tag>,
			{ status: 500 }
		);
	}
}

// DELETE a tag
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.tag.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting tag:", error);
		return Response.json(
			{ data: null, error: "Failed to delete tag" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
