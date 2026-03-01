export const getFirstErrorMessage = (errors: Record<string, any>): string | null => {
  if (!errors || typeof errors !== "object") return null;

  const firstError = Object.values(errors)[0];

  return firstError?.message ?? null;
};