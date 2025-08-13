import Container from "@/components/shared/Container";
import ProfileDetailsCard from "@/components/shared/UserProfile/ProfileDetailsCard";
import { DownArrowIcon, UpArrowIcon } from "@/icons";
import CelebrityProfileFeature from "./_components/CelebrityProfileFeature";

const cardDetailsData = [
  {
    id: 1,
    title: "Total Sales",
    value: "120 items sold",
    icon: <UpArrowIcon />,
  },
  {
    id: 2,
    title: "Total Earnings",
    value: "$5,000 earned",
    icon: <DownArrowIcon />,
  },
  {
    id: 3,
    title: "Total Followers",
    value: "12",
    icon: <DownArrowIcon />,
  },
  {
    id: 4,
    title: "Total Funds Raised",
    value: "$2,00",
    icon: <UpArrowIcon />,
  },
];

export default function CelebrityProfilePage() {
  return (
     <Container className="space-y-5">
      <ProfileDetailsCard data={cardDetailsData} />
      <CelebrityProfileFeature />
    </Container>
  )
}
