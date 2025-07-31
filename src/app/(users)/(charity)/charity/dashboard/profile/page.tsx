import Container from "@/components/shared/Container";
import CharityProfileContainerForm from "./_components/CharityProfileContainerForm";

export default function CharityUserProfileDashboard() {
  return (
    <Container className="space-y-4">
      <div
        style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.06)" }}
        className="flex justify-center items-center py-2"
      >
        <p className="font-medium text-xl">Profile Details</p>
      </div>
      <CharityProfileContainerForm />
    </Container>
  );
}
