import Container from "@/components/shared/Container";
import ChangePasswordForm from "@/components/shared/UserProfile/settings/ChangePasswordForm";
import DeleteAccountSection from "@/components/shared/UserProfile/settings/DeleteAccountSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const typeOfDonation = [
  {
    id: 1,
    title: "Accept clothes donations",
    checked: true,
  },
  {
    id: 2,
    title: "Accept money donations",
    checked: false,
  },
];

export default function CharityShopSettingContainer() {
  return (
    <Container className="md:space-y-8 space-y-5">
      <ChangePasswordForm />
      <div>
        <h5 className="font-medium">Available for donate</h5>
        <div className="flex justify-center items-center mt-4 gap-x-5">
          {typeOfDonation.map((item) => (
            <div className="flex items-center gap-3">
              <Checkbox id="terms" checked={item.checked} />
              <Label htmlFor="terms">{item.title}</Label>
            </div>
          ))}
        </div>
      </div>
      <DeleteAccountSection />
    </Container>
  );
}
