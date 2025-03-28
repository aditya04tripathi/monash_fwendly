"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";
import { toast } from "sonner";
import { registerUser } from "@/lib/mutations";

const RegisterForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		name: "",
		studentId: "",
		email: "",
		password: "",
		startYear: "",
		endYear: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleRegisterUser = async () => {
		// Validate form
		if (Object.values(form).some((value) => !value)) {
			toast.error("Please fill in all fields");
			return;
		}

		try {
			setLoading(true);
			const result = await registerUser(form);

			if (result.error || !result.data) {
				toast.error(result.error || "Registration failed");
				return;
			}

			dispatch(setUser(result.data));
			toast.success("User registered successfully!");
		} catch (error) {
			console.error(error);
			toast.error("Error registering user!");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Input
				value={form.name}
				onChange={handleChange}
				type="text"
				name="name"
				placeholder="Enter your name cap'n..."
			/>
			<Input
				value={form.studentId}
				onChange={handleChange}
				type="text"
				name="studentId"
				placeholder="Enter your student ID..."
			/>
			<Input
				value={form.email}
				onChange={handleChange}
				type="email"
				name="email"
				placeholder="Enter your student email address..."
			/>
			<Input
				value={form.password}
				onChange={handleChange}
				type="password"
				name="password"
				placeholder="Enter your desired passphrase..."
			/>
			<div className="flex gap-2">
				<Input
					value={form.startYear}
					onChange={handleChange}
					name="startYear"
					type="number"
					placeholder="When did your session start?"
				/>
				<Input
					value={form.endYear}
					onChange={handleChange}
					name="endYear"
					type="number"
					placeholder="When will your session end?"
				/>
			</div>
			<div className="flex flex-col flex-1 mt-6">
				<Button onClick={handleRegisterUser} disabled={loading}>
					{loading ? "Registering..." : "Register"}
				</Button>
				<Button onClick={() => router.replace("/auth/login")} variant={"link"}>
					Already have an account? Login
				</Button>
			</div>
		</>
	);
};

export default RegisterForm;
