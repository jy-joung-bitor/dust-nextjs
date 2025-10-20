'use server';

import { prisma } from "@/prisma";

export async function getDusts() {
    return await prisma.dust.findMany();
}

export async function updateBookmarked(id: string, bookmarked: boolean) {
    await prisma.dust.update({
        where: {
            id,
        },
        data: {
            bookmarked: !bookmarked,
        }
    });
}