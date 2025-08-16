import CharitySupportCards from "@/components/shared/Cards/CharitySupportCards";
import Container from "@/components/shared/Container";
import React from "react";

const defaultCharitySupportData = [
  {
    _id: 1,
    image: "/charityImage1.png",
    title: "SAVE THE CHILDREN",
    present: 5,
  },
  {
    _id: 2,
    image: "/charityImage2.png",
    title: "Plant More Trees",
    present: 10,
  },
  {
    _id: 3,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 4,
    image: "/charityImage2.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 5,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 6,
    image: "/charityImage1.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 7,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 8,
    image: "/charityImage1.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 9,
    image: "/charityImage2.png",
    title: "Women for Women International",
    present: 15,
  }, 
  {
    _id: 7,
    image: "/charityImage3.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 8,
    image: "/charityImage1.png",
    title: "Women for Women International",
    present: 15,
  },
  {
    _id: 9,
    image: "/charityImage2.png",
    title: "Women for Women International",
    present: 15,
  }
];

export default function AllCharitiesPage() {
  return (
    <Container>
      <CharitySupportCards charitySupportsData={defaultCharitySupportData} className="xl:grid-cols-4" />
    </Container>
  );
}
