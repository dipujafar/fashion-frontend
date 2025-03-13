import TeamMemberData from "./TeamMemberData";
import SlotCounter from "react-slot-counter";

const Team = () => {
  return (
    <div className="lg:space-y-4 space-y-2">
      <h1 className="page-title text-center">Our Team</h1>
      <h4 className="section-title max-w-4xl mx-auto">Meet Our Team</h4>
      <TeamMemberData></TeamMemberData>
    </div>
  );
};

export default Team;
