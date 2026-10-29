export function buildAuthFinishFormData(
  values: Record<string, any>,
  documents: File[]
): FormData {
  const cleanedData: Record<string, any> = {};

  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed !== "") {
        cleanedData[key] = trimmed;
      }
      return;
    }
    if (Array.isArray(value)) {
      cleanedData[key] = value.map((v) => (typeof v === "string" ? v.trim() : v)).filter(Boolean);
      return;
    }
    cleanedData[key] = value;
  });

  const formData = new FormData();

  documents.forEach((doc) => {
    formData.append("documents", doc);
  });

  formData.append("data", JSON.stringify(cleanedData));

  return formData;
}

