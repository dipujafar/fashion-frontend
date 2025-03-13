import Container from "@/components/shared/Container";
import UsersPageContainer from "./_components/UsersPageContainer";

const UserPages = () => {
  return (
    <Container>
      <h1 className="page-title text-center">Explore User</h1>
      <UsersPageContainer></UsersPageContainer>
    </Container>
  );
};

export default UserPages;
