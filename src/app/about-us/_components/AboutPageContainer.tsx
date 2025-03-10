import Container from "@/components/shared/Container";
import React from "react";
import StatisticSection from "./StatisticSection";
import Mission from "./Mission/Mission";
import Values from "./Values/Values";

const AboutPageContainer = () => {
  return (
    <Container className="lg:space-y-16 space-y-8">
      <div className="lg:space-y-8 space-y-4">
        <h1 className="page-title text-center">Our Stroy</h1>
        <div className="space-y-4">
          <h4 className="text-center lg:text-4xl text-2xl font-bold max-w-2xl mx-auto">
            Fashi-on Scope: Redefining Fashion with Purpose
          </h4>
          <p className="md:text-center text-lg max-w-5xl mx-auto text-primary-gray">
            Fashi-on Scope was born from a simple yet powerful idea: to redefine
            fashion by making high-quality, stylish, and sustainable fashion
            more accessible. We saw the growing demand for ethical shopping and
            wanted to create a marketplace that not only connects buyers and
            sellers but also supports charities and promotes circular fashion.
            Our journey started with a vision to make fashion more inclusive,
            eco-friendly, and community-driven.
          </p>
        </div>

        <StatisticSection></StatisticSection>
      </div>
      <Mission></Mission>
      <Values></Values>
    </Container>
  );
};

export default AboutPageContainer;
