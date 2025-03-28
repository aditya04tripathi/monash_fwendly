import { User } from "@prisma/client";
import { ApiResponse } from "@/types/api";

/**
 * Login a user with the provided credentials
 * @param email User's email address
 * @param password User's password
 * @returns Promise with user data or error
 */
export const loginUser = async (
	email: string,
	password: string
): Promise<ApiResponse<User>> => {
	try {
		const response = await fetch("/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const data: ApiResponse<User> = await response.json();
		return data;
	} catch (error) {
		console.error("Error in loginUser:", error);
		return { data: null, error: "Failed to login" };
	}
};

/**
 * Get current user data
 * @returns Promise with user data
 */
export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
	try {
		const response = await fetch("/api/auth/me", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data: ApiResponse<User> = await response.json();
		return data;
	} catch (error) {
		console.error("Error in getCurrentUser:", error);
		return { data: null, error: "Failed to get current user" };
	}
};
