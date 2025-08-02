import React from "react";
import CharitySignForm from "./_components/CharitySignForm";
import PageTopSection from "@/components/shared/PageTopSection";

export default function CharitySignPage() {
  return (
    <div>
      <PageTopSection title="Join us as a Charity Account"></PageTopSection>
      <CharitySignForm />
    </div>
  );
}
