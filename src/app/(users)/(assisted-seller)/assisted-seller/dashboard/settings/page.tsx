import Container from '@/components/shared/Container'
import ChangePasswordForm from '@/components/shared/UserProfile/settings/ChangePasswordForm'
import DeleteAccountSection from '@/components/shared/UserProfile/settings/DeleteAccountSection'

export const metadata = {
    title: "Settings",
};

export default function page() {
  return (
    <Container className="md:space-y-8 space-y-5">
      <ChangePasswordForm />
      <DeleteAccountSection />
    </Container>
  )
}
