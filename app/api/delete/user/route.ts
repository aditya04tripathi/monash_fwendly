import { prisma } from "@/lib/utils";

export const GET = async () => {
	await prisma.user.deleteMany();

	const users = await prisma.user.findMany();

	return Response.json({
		data: users,
		error: null,
	});
};
