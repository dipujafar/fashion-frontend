import Container from "@/components/shared/Container";
import ChangePasswordForm from "@/components/shared/UserProfile/settings/ChangePasswordForm";
import DeleteAccountSection from "@/components/shared/UserProfile/settings/DeleteAccountSection";

const SettingPage = () => {
  return (
    <Container className="md:space-y-8 space-y-5">
      <ChangePasswordForm />
      <DeleteAccountSection />
    </Container>
  );
};

export default SettingPage;
