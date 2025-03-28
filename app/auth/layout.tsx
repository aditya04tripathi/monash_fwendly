import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: Readonly<React.ReactNode> }) => {
	return (
		<div className="flex items-center justify-center w-full min-h-screen">
			<div className=" bg-secondary rounded border h-[80vh] w-[80vw] flex items-center justify-start overflow-hidden">
				<Image
					alt="Auth page image"
					src="https://picsum.photos/1000"
					width={1000}
					height={1000}
					className="object-cover w-1/2 h-full border-r"
				/>

				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
