export function formatLabel(label: string): string {
  return (
    label
      // Add space before capital letters that follow lowercase letters (camelCase split)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Add space around special characters like "&"
      .replace(/&/g, " & ")
      // Capitalize each word
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
