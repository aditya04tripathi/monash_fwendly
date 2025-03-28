import { User, Prisma } from "@prisma/client";
import { ApiResponse } from "@/types/api";

/**
 * Register a new user
 * @param userData User registration data
 * @returns Promise with created user data or error
 */
export const registerUser = async (userData: {
	name: string;
	email: string;
	password: string;
	studentId: string;
	startYear: string;
	endYear: string;
}): Promise<ApiResponse<User>> => {
	try {
		const response = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data: ApiResponse<User> = await response.json();
		return data;
	} catch (error) {
		console.error("Error in registerUser:", error);
		return { data: null, error: "Failed to register user" };
	}
};

/**
 * Log out the current user
 * @returns Promise with logout status
 */
export const logoutUser = async (): Promise<ApiResponse<null>> => {
	try {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data: ApiResponse<null> = await response.json();
		return data;
	} catch (error) {
		console.error("Error in logoutUser:", error);
		return { data: null, error: "Failed to logout" };
	}
};

/**
 * Update user profile data
 * @param userData Partial user data to update
 * @returns Promise with updated user data or error
 */
export const updateUserProfile = async (
	userData: Partial<User>
): Promise<ApiResponse<User>> => {
	try {
		const response = await fetch("/api/user/profile", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		const data: ApiResponse<User> = await response.json();
		return data;
	} catch (error) {
		console.error("Error in updateUserProfile:", error);
		return { data: null, error: "Failed to update profile" };
	}
};
