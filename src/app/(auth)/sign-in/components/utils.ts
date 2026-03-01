export const redirectUrl = (role: any) => {
  switch (role) {
    case "INDIVIDUAL_USER":
      return "/individual-user/profile";
    case "CHARITABLE_ORGANIZATION":
      return "/charity/profile";
    case "CHARITY_SHOP":
        return "/charity-shop/profile"
    case "ECO_FRIENDLY_STORE":
        return "/eco-friendly-store/profile";
    case "CELEBRITY":
        return "/celebrity/profile";
    case "AMBASSADOR":
        return "/ambassador/profile";
    case "PROFESSIONAL_SELLER":
        return "/professional-seller/profile";
    case "ASSISTED_SELLER":
        return "/assisted-seller/profile";
    default:
      return "/";
  }
};
