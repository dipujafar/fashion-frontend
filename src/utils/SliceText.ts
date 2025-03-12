export const sliceText = (text: string, length: number) => {
  const trimmedText = text.trim();
  if (trimmedText?.length <= length) return trimmedText;
  return trimmedText.slice(0, length - 3) + "....";
};
