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
    title: "Total Earnings",
    value: "$5,000 earned",
    icon: <DownArrowIcon/>,
  },
  {
    id: 3,
    title: "Total Followers",
    value: "12",
    icon: <DownArrowIcon/>,
  },
  {
    id: 4,
    title: "Total Funds Raised",
    value: "$2,00",
    icon: <UpArrowIcon/>,
  },
];

const ProfilePage = () => {
  return (
    <Container className="space-y-5">
      <ProfileDetailsCard data={cardDetailsData} />
      <ProfileFeatures />
    </Container>
  );
};

export default ProfilePage;
