"use client";

import { useRouter } from "next/navigation";

interface UpdateParamsOptions {
  path: string; 
  params: Record<string, string | null>;
  targetId?: string;
}

export function useUpdateSearchParamsWithRedirect() {
  const router = useRouter();

  return ({ path, params, targetId }: UpdateParamsOptions) => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== null) {
        searchParams.set(key, value);
      }
    }

    const queryString = searchParams.toString();
    const url = queryString ? `${path}?${queryString}` : path;

    router.push(url, { scroll: false });

    if (targetId) {
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
  };
}
