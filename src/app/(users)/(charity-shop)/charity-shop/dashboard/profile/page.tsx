import Container from "@/components/shared/Container";
import ProfileFeatures from "./_components/ProfileFeatures";
import { DownArrowIcon, UpArrowIcon } from "@/icons";
import ProfileDetailsCard from "@/components/shared/UserProfile/ProfileDetailsCard";

const cardDetailsData = [
  {
    id: 1,
    title: "Total Sales",
    value: "120 items sold",
    icon: <UpArrowIcon/>,
  },
  {
    id: 2,
    title: "Total Followers",
    value: "12",
    icon: <DownArrowIcon/>,
  },
  {
    id: 3,
    title: "Total Donation Raised",
    value: "$25,000",
    icon: <UpArrowIcon/>,
  },
];
export default function CharityShopProfilePage() {
  return (
    <Container className="space-y-5">
      <ProfileDetailsCard data={cardDetailsData} />
      <ProfileFeatures />
    </Container>
  );
}
