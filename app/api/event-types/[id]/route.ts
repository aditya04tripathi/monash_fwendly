import { PrismaClient, EventType, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single event type by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const eventType = await prisma.eventType.findUnique({
			where: { id },
			include: { events: true },
		});

		if (!eventType) {
			return Response.json(
				{ data: null, error: "Event type not found" } as ApiResponse<EventType>,
				{ status: 404 }
			);
		}

		return Response.json(
			{ data: eventType, error: null } as ApiResponse<EventType>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching event type:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to fetch event type",
			} as ApiResponse<EventType>,
			{ status: 500 }
		);
	}
}

// PUT update an event type (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const eventTypeData: Prisma.EventTypeUpdateInput = await request.json();

		const updatedEventType = await prisma.eventType.update({
			where: { id },
			data: eventTypeData,
		});

		return Response.json(
			{ data: updatedEventType, error: null } as ApiResponse<EventType>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating event type:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to update event type",
			} as ApiResponse<EventType>,
			{ status: 500 }
		);
	}
}

// PATCH partially update an event type
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const eventTypeData: Prisma.EventTypeUpdateInput = await request.json();

		const updatedEventType = await prisma.eventType.update({
			where: { id },
			data: eventTypeData,
		});

		return Response.json(
			{ data: updatedEventType, error: null } as ApiResponse<EventType>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching event type:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to patch event type",
			} as ApiResponse<EventType>,
			{ status: 500 }
		);
	}
}

// DELETE an event type
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.eventType.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting event type:", error);
		return Response.json(
			{ data: null, error: "Failed to delete event type" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
