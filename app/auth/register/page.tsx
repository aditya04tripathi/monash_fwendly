import RegisterForm from "@/components/register-form";
import React from "react";

const RegisterPage = () => {
	return (
		<div className="flex flex-col items-stretch justify-between w-full p-10 space-y-2">
			<div className="mb-6">
				<h1 className="text-2xl">
					Welcome to{" "}
					<span className="font-bold text-primary">Monash Fwendly</span> 👋
				</h1>
				<p className="text-sm text-muted-foreground">
					Enter your details to register for an account!
				</p>
			</div>

			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
