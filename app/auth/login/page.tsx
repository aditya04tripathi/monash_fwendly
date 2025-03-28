import LoginForm from "@/components/login-form";
import React from "react";

const LoginPage = () => {
	return (
		<div className="flex flex-col items-stretch justify-between w-full p-10 space-y-2">
			<div className="mb-6">
				<h1 className="text-2xl">
					Welcome to{" "}
					<span className="font-bold text-primary">Monash Fwendly</span> 👋
				</h1>
				<p className="text-sm text-muted-foreground">
					Please login and start making new friends!
				</p>
			</div>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
