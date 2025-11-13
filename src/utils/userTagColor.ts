export const userTagColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "celebrity":
      return "#123CA6";
    case "eco-friendly store":
      return "#00B047";
    case "charity":
      return "#008236";
    case "charity store":
      return "#B59900";
    case "professional seller":
      return "#b91a4f";
    case "ambassador":
      return "#81b91a";
    case "individual seller":
      return "#b96f1a";
    case "assisted-seller":
      return "#123CA6";
    default:
      return "#000";
  }
};
