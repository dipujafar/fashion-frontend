import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import webLogo from "@/assets/icons/web-logo.png"
import Image from "next/image";

export default function StatsInfo({ userRole }: { userRole: string }) {
  return (
    <Card
      style={{ boxShadow: "1px 4px 10px 0px rgba(0, 0, 0, 0.15)" }}
      className="w-full  p-6"
    >
      {/* ---------------------------- display tag for charity store role --------------------------- */}
      {userRole === "charity store" && (
        <div className="flex flex-wrap gap-x-3">
          <div className="flex-1 bg-[#B59900] text-white p-1.5 text-center">
            <h5>CHARITY STORE</h5>
          </div>
          <div className="flex-1 bg-[#87CEEB] text-white p-1.5 text-center">
            <h5>TOP SELLER</h5>
          </div>
        </div>
      )}

      {/* --------------------------- display tag for eco-friendly store role --------------------------- */}
      {userRole === "eco-friendly-store" && (
        <div className="flex flex-wrap gap-x-3">
          <div className="flex-1 bg-[#00B047] text-white p-1.5 text-center">
            <h5>ECO-FRIENDLY STORE</h5>
          </div>
          <div className="flex-1 bg-[#87CEEB] text-white p-1.5 text-center">
            <h5>TOP SELLER</h5>
          </div>
        </div>
      )}
      {/* --------------------------- display tag for charity role ---------------------------   */}
      {userRole === "charity" && (
        <div className=" bg-[#4B105F] text-white p-1.5 text-center ">
          <h5>CHARITABLE ORGANIZATION</h5>
        </div>
      )}

      <div className="grid xs:grid-cols-2 gap-6">
        {/* First Row */}
        {userRole !== "charity" && (
          <div className="space-y-1">
            <p className="md:text-lg text-muted-foreground">Total Products</p>
            <p className="md:text-2xl text-xl font-medium">20+</p>
          </div>
        )}
        
          <div className="space-y-1">
            <p className="md:text-lg text-muted-foreground">
              Total Donations Raised
            </p>
            <p className="md:text-2xl text-xl font-medium">$5.00</p>
          </div>
        

        {/* Second Row */}
        <div className="space-y-1">
          <p className="md:text-lg text-muted-foreground">Followers</p>
          <p className="md:text-2xl text-xl font-medium">12k+</p>
        </div>
        <div className="space-y-1">
          <p className="md:text-lg text-muted-foreground">Following</p>
          <p className="md:text-2xl text-xl font-medium">24</p>
        </div>

        {/* Third Row */}
       {userRole !== "charity" && <div className="space-y-1">
          <p className="md:text-lg text-muted-foreground">Item Sold</p>
          <p className="md:text-2xl text-xl font-medium">100</p>
        </div>}
     { userRole !== "charity" &&   <div className="space-y-1">
          <p className="md:text-lg text-muted-foreground">Rating & Review</p>
          <div className="flex items-center gap-1 line-clamp-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <p className="md:text-2xl text-xl font-medium">4.9</p>
            <p className="md:text-lg text-muted-foreground line-clamp-1">
              (12 Reviews)
            </p>
          </div>
        </div>}

      {userRole === "charity" && <div className="space-y-1">
          <p className="md:text-lg text-muted-foreground">Website</p>
          <p className="md:text-2xl text-xl font-medium">
            <Image src={webLogo} alt="web-logo" width={30} height={30} />
          </p>
        </div>}
      </div>
    </Card>
  );
}
