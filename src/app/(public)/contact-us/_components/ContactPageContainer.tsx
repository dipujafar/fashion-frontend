import React from "react";
import ContactForm from "./ContactForm";
import Container from "@/components/shared/Container";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const ContactPageContainer = () => {
  return (
    <Container className=" space-y-8 md:pt-10 md:pb-16 pt-5 pb-8">
      <div>
        <h2 className="xl:text-4xl md:text-3xl text-2xl font-medium text-center ">
          Get in touch
        </h2>
        <div className="text-[#1372C4] flex justify-between xl:px-16 md:px-8 px-2 mt-4 flex-wrap">
          <div className="flex items-center gap-x-1">
            <MapPin size={20} />
            <p>123/A, Washington, UK</p>
          </div>
          <div className="flex items-center gap-x-1">
            <Phone size={20} />
            <Link href="tel:1234567890"> 1234567890</Link>
          </div>
          <div className="flex items-center gap-x-1">
            <Mail size={20} />
            <Link href="mailto:aquamarket@gmail.com">aquamarket@gmail.com</Link>
          </div>
          <div className="flex items-center gap-x-1">
            <Clock size={20} />
            <p>Available, 24/7</p>
          </div>
        </div>
      </div>
      <div>
        <ContactForm />
      </div>
      <div>
        {/* <LocationMap></LocationMap> */}
      </div>
    </Container>
  );
};

export default ContactPageContainer;