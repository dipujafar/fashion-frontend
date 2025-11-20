import Container from "@/components/shared/Container";
import UsersPageContainer from "./_components/UsersPageContainer";

export const metadata = {
  title: "Users",
  description: "All users will find here",
};

const UserPages = () => {
  return (
    <Container>
      <div>
        <h1 className="page-title text-center pt-5">Explore User</h1>
      </div>
      <UsersPageContainer></UsersPageContainer>
    </Container>
  );
};

export default UserPages;
