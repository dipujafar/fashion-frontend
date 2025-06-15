"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, ChevronDown, Search, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PaginationSection from "@/components/shared/Pagination/PaginationSection";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";

interface Product {
  id: string;
  image: string;
  title: string;
  itemNumber: string;
  date: string;
  status: "Pending" | "Approved" | "Reject";
}

const products: Product[] = [
  {
    id: "1",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Pending",
  },
  {
    id: "2",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
  },
  {
    id: "3",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Reject",
  },
  {
    id: "4",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
  },
  {
    id: "5",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Reject",
  },
  {
    id: "6",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
  },
  {
    id: "7",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Reject",
  },
  {
    id: "8",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Pending",
  },
];

export default function UploadedProductListTable() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [statusFilters, setStatusFilters] = useState<string[]>([
    "Pending",
    "Approved",
    "Reject",
  ]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredProducts.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, productId]);
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== productId));
    }
  };

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilters([...statusFilters, status]);
    } else {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    }
  };

  const filteredProducts = products.filter((product) =>
    statusFilters.includes(product.status)
  );

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Pending":
        return "text-green-600";
      case "Approved":
        return "text-blue-600";
      case "Reject":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div>
      {/* ------------------- filter and navigate section ------------------ */}
      <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search here...."
            className="pl-10 bg-black/5 py-5"
          />
        </div>
        <div>
          <Popover>
            <PopoverTrigger className="w-full text-start">
              <div className="p-2 bg-black/5 rounded-lg border flex  justify-between ">
                <p className="text-[#8A8A8A]">Filter by date</p>
                <CalendarDays size={20} color="#8A8A8A" />
              </div>
            </PopoverTrigger>
            <PopoverContent className="">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className=""
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
        </div>
        <Link href={"/individual-user/uploaded-products-list/sale"}>
          <div className="p-2 bg-black/5 rounded-lg  ">
            <p className="text-[#8A8A8A]">Sale</p>
          </div>
        </Link>
        <Link href={"/individual-user/uploaded-products-list/purchase-product"}>
          <div className="p-2 bg-black/5 rounded-lg  ">
            <p className="text-[#8A8A8A]">Purchase</p>
          </div>
        </Link>
      </div>

      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          disabled={selectedItems.length === 0}
          className="text-sm"
        >
          Mark as Delete
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black">
              <TableHead className="w-12 text-white">
                <Checkbox
                  checked={
                    filteredProducts.length > 0 &&
                    selectedItems.length === filteredProducts.length
                  }
                  onCheckedChange={handleSelectAll}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
              </TableHead>
              <TableHead className="text-white font-medium">Image</TableHead>
              <TableHead className="text-white font-medium">
                Product Title
              </TableHead>
              <TableHead className="text-white font-medium">
                Item Number
              </TableHead>
              <TableHead className="text-white font-medium">Date</TableHead>
              <TableHead className="text-white font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-white hover:bg-gray-800 hover:text-white"
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Pending")}
                      onCheckedChange={(checked) =>
                        handleStatusFilterChange("Pending", checked)
                      }
                    >
                      <span className="text-green-600">Pending</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Approved")}
                      onCheckedChange={(checked) =>
                        handleStatusFilterChange("Approved", checked)
                      }
                    >
                      <span className="text-blue-600">Approved</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Reject")}
                      onCheckedChange={(checked) =>
                        handleStatusFilterChange("Reject", checked)
                      }
                    >
                      <span className="text-red-600">Reject</span>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableHead>
              <TableHead className="text-white font-medium">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox
                    checked={selectedItems.includes(product.id)}
                    onCheckedChange={(checked) =>
                      handleSelectItem(product.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 relative rounded overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell className="text-gray-600">
                  {product.itemNumber}
                </TableCell>
                <TableCell className="text-gray-600">{product.date}</TableCell>
                <TableCell>
                  <span
                    className={`text-sm font-medium ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationSection />
    </div>
  );
}
