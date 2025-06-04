export const activeNavLink = (
  arr: string[],
  navLink: string,
  currentPath: string
) => {
  const link = navLink.slice(1, navLink?.length);

  if (navLink !== "/") {
    return arr.includes(link);
  }
  if (navLink === "/" && currentPath === "/") {
    return true;
  }
};
