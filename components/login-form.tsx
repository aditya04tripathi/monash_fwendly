"use client";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginUser } from "@/lib/queries";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";
import { toast } from "sonner";

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [form, setForm] = useState({
		email: "",
		password: "",
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleLogin = async () => {
		if (!form.email || !form.password) {
			toast.error("Please fill in all fields");
			return;
		}

		try {
			setLoading(true);
			const result = await loginUser(form.email, form.password);

			if (result.error || !result.data) {
				toast.error(result.error || "Login failed");
				return;
			}

			dispatch(setUser(result.data));
			console.log(result.data);
			toast.success("Login successful!");
		} catch (error) {
			console.error(error);
			toast.error("Error during login");
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Input
				value={form.email}
				onChange={handleChange}
				name="email"
				type="email"
				placeholder="Enter your student email address..."
			/>
			<Input
				value={form.password}
				onChange={handleChange}
				name="password"
				type="password"
				placeholder="Enter the passphrase..."
			/>
			<div className="flex flex-col flex-1 mt-6">
				<Button onClick={handleLogin} disabled={loading}>
					{loading ? "Logging in..." : "Login"}
				</Button>
				<Button
					onClick={() => router.replace("/auth/register")}
					variant={"link"}
				>
					Don't have an account? Register
				</Button>
			</div>
		</>
	);
};

export default LoginForm;
