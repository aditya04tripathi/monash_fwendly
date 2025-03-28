import { PrismaClient, Event, Prisma } from "@prisma/client";
import { NextRequest } from "next/server";
import { ApiResponse } from "@/types/api";

const prisma = new PrismaClient();

// GET all events
export async function GET(request: NextRequest) {
	try {
		const events = await prisma.event.findMany({
			include: {
				creator: true,
				attendees: true,
				tags: true,
				eventType: true,
				course: true,
			},
		});
		return Response.json(
			{ data: events, error: null } as ApiResponse<Event[]>,
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error fetching events:", error);
		return Response.json(
			{ data: null, error: "Failed to fetch events" } as ApiResponse<Event[]>,
			{ status: 500 }
		);
	}
}

// POST create a new event
export async function POST(request: NextRequest) {
	try {
		const eventData: Prisma.EventCreateInput = await request.json();
		const newEvent = await prisma.event.create({
			data: eventData,
		});
		return Response.json(
			{ data: newEvent, error: null } as ApiResponse<Event>,
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error creating event:", error);
		return Response.json(
			{ data: null, error: "Failed to create event" } as ApiResponse<Event>,
			{ status: 500 }
		);
	}
}
