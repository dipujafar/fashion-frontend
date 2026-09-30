"use server"

import { revalidatePath } from "next/cache"

export const invalidatePath = async (path: string) => {
    revalidatePath(path);
}