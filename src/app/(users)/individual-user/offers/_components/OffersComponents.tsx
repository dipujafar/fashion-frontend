"use client";;
import { useState } from "react";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOfferProduct } from "@/types";
import { OfferProductCard } from "@/components/shared/Cards/OfferProductCard";

export default function OffersComponents() {
  const [products, setProducts] = useState<TOfferProduct[]>([
    {
      id: "1",
      itemNumber: "#A007",
      productPrice: 300.0,
      offerPrice: 200.0,
      status: "Pending",
      timeRemaining: "19hrs 3 mins",
      images: [
        "/offer_page_product1.png",
        "/offer_page_product2.png",
        "/offer_page_product3.png",
        "/offer_page_product2.png",
        "/offer_page_product2.png",
      ],
    },
    {
      id: "2",
      itemNumber: "#A007",
      productPrice: 300.0,
      offerPrice: 200.0,
      status: "Offer Accepted",
      timeRemaining: "19hrs 3 mins",
      images: [
        "/offer_page_product1.png",
        "/offer_page_product2.png",
        "/offer_page_product3.png",
        "/offer_page_product2.png",
        "/offer_page_product2.png",
      ],
    },
    {
      id: "3",
      itemNumber: "#A007",
      productPrice: 300.0,
      offerPrice: 200.0,
      status: "Expired",
      images: [
        "/offer_page_product1.png",
        "/offer_page_product2.png",
        "/offer_page_product3.png",
        "/offer_page_product2.png",
        "/offer_page_product2.png",
      ],
    },
  ]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>
        <div className="flex-1">
          <Select defaultValue="all">
            <SelectTrigger className="w-full py-5 border-none bg-gray-100">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Offer Accepted</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <OfferProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

