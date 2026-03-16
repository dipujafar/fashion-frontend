export const userRoleMapper = (type: string) => {
  switch (type) {
    case "CELEBRITY":
      return { color: "#123CA6", label: "Celebrity" };
    case "ECO_FRIENDLY_STORE":
      return { color: "#00B047", label: "Eco-Friendly Store" };
    case "CHARITABLE_ORGANIZATION":
      return { color: "#008236", label: "Charity" };
    case "CHARITY_SHOP":
      return { color: "#B59900", label: "Charity Store" };
    case "PROFESSIONAL_SELLER":
      return { color: "#b91a4f", label: "Professional Seller" };
    case "AMBASSADOR":
      return { color: "#81b91a", label: "Ambassador" };
    case "INDIVIDUAL_USER":
      return { color: "#b96f1a", label: "Individual Seller" };
    case "ASSISTED_SELLER":
      return { color: "#123CA6", label: "Assisted Seller" };
    default:
      return { color: "#000", label: "" };
  }
};
