import Container from "@/components/shared/Container";
import MessageContainer from "@/components/shared/Message/MessageContainer";

export const metadata = {
  title: "Message",
  description: "Start conversation",
};

export default function MessagePage() {
  return (
    <Container>
      <MessageContainer />
    </Container>
  );
}
