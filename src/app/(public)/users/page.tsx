import Container from "@/components/shared/Container";
import UsersPageContainer from "./_components/UsersPageContainer";

const UserPages = () => {
  return (
    <Container>
      <div>
        <h1 className="page-title text-center">Explore User</h1>
      </div>
      <UsersPageContainer></UsersPageContainer>
    </Container>
  );
};

export default UserPages;
