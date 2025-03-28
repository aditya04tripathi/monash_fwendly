import { PrismaClient, EventType, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all event types
export async function GET() {
	try {
		const eventTypes = await prisma.eventType.findMany({
			include: { events: true },
		});
		return Response.json(
			{ data: eventTypes, error: null } as ApiResponse<EventType[]>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching event types:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch event types" } as ApiResponse<
				EventType[]
			>,
			{ status: 500 }
		);
	}
}

// POST create a new event type
export async function POST(request: NextRequest) {
	try {
		const eventTypeData: Prisma.EventTypeCreateInput = await request.json();
		const newEventType = await prisma.eventType.create({
			data: eventTypeData,
		});
		return Response.json(
			{ data: newEventType, error: null } as ApiResponse<EventType>,
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating event type:", error);
		return Response.json(
			{
				data: null,
				error: "Failed to create event type",
			} as ApiResponse<EventType>,
			{ status: 500 }
		);
	}
}
