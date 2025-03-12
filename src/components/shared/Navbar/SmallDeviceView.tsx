"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/NavLinks";
import { TableOfContents } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/common-image/logo.png";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  childrenVariants,
  parentVariants,
} from "@/animations/FramerMotionValiants";
import { Input } from "@/components/ui/input";
import SearchAndNavIcon from "./SearchAndNavIcon";

const SmallDeviceView = () => {
  const currentPath = usePathname();
  return (
    <div className="md:hidden block ">
      <Sheet>
        <SheetTrigger asChild>
          <TableOfContents size={24} />
        </SheetTrigger>
        <SheetContent className="pt-10">
          <Image src={logo} alt="logo" className="mx-auto"></Image>

          <motion.div
            initial={{ opacity: 0, y: "-10%" }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-10%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true }}
          >
            <motion.ul
              variants={parentVariants}
              initial="initial"
              whileInView="animate"
              exit="exit"
              viewport={{ once: true }}
              className="flex flex-col gap-y-2 items-center mt-3"
            >
              {navLinks.map((link) => (
                <motion.li
                  variants={childrenVariants}
                  key={link.id}
                  className="group relative overflow-hidden"
                >
                  {/* Background Hover Effect */}
                  <span
                    className={cn(
                      "absolute inset-0 bg-black/10 transform scale-x-0 transition-transform duration-700 ease-in-out group-hover:scale-x-100",
                      "z-0",
                      currentPath === link.href && "scale-x-100"
                    )}
                  ></span>

                  {/* Navigation Link */}
                  <Link
                    href={link.href}
                    className={cn(
                      "relative uppercase py-2 px-6 font-medium z-10 transition-colors duration-300"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ============== icons links ===================  */}
          <SearchAndNavIcon></SearchAndNavIcon>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SmallDeviceView;
