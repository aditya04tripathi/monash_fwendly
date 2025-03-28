import { PrismaClient, Event, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET a single event by ID
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const event = await prisma.event.findUnique({
			where: { id },
			include: {
				creator: true,
				attendees: true,
				tags: true,
				eventType: true,
				course: true,
			},
		});

		if (!event) {
			return Response.json(
				{ data: null, error: "Event not found" } as ApiResponse<Event>,
				{ status: 404 }
			);
		}

		return Response.json({ data: event, error: null } as ApiResponse<Event>, {
			status: 200,
		});
	} catch (error) {
		console.error("Error fetching event:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch event" } as ApiResponse<Event>,
			{ status: 500 }
		);
	}
}

// PUT update an event (full update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const eventData: Prisma.EventUpdateInput = await request.json();

		const updatedEvent = await prisma.event.update({
			where: { id },
			data: eventData,
		});

		return Response.json(
			{ data: updatedEvent, error: null } as ApiResponse<Event>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error updating event:", error);
		return Response.json(
			{ data: null, error: "Failed to update event" } as ApiResponse<Event>,
			{ status: 500 }
		);
	}
}

// PATCH partially update an event
export async function PATCH(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;
		const eventData: Prisma.EventUpdateInput = await request.json();

		const updatedEvent = await prisma.event.update({
			where: { id },
			data: eventData,
		});

		return Response.json(
			{ data: updatedEvent, error: null } as ApiResponse<Event>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error patching event:", error);
		return Response.json(
			{ data: null, error: "Failed to patch event" } as ApiResponse<Event>,
			{ status: 500 }
		);
	}
}

// DELETE an event
export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const id = params.id;

		await prisma.event.delete({
			where: { id },
		});

		return Response.json({ data: null, error: null } as ApiResponse<null>, {
			status: 204,
		});
	} catch (error) {
		console.error("Error deleting event:", error);
		return Response.json(
			{ data: null, error: "Failed to delete event" } as ApiResponse<null>,
			{ status: 500 }
		);
	}
}
