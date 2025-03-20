import React from "react";
import UserAvatar from "./UserAvatar";
import Container from "@/components/shared/Container";

const AvatarTitleContainer = () => {
  return (
    <Container className="flex justify-center">
      <UserAvatar></UserAvatar>
    </Container>
  );
};

export default AvatarTitleContainer;
