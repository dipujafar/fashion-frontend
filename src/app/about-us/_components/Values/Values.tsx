import valuesImage from "@/assets/images/about-us/valuesImage.jpeg";
import Image from "next/image";
import ValuesData from "./ValuesData";
const Values = () => {
  return (
    <div className="md:space-y-4 space-y-2">
      <h1 className="page-title text-center">Our Values</h1>
      <h4 className="text-center lg:text-4xl text-2xl font-bold max-w-4xl mx-auto">
        Empowering Change Through Fashion, Sustainability, and Giving Back
      </h4>
      {/* ================ values ================ */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center mt-10">
        <div className="lg:w-2/5">
          <ValuesData></ValuesData>
        </div>
        <div className="lg:w-3/5">
          <Image src={valuesImage} alt="valuesImage" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Values;
