"use client"
import { useState } from "react"
import Image from "next/image"
import { Eye, ChevronDown, Trash2, SquarePen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import PaginationSection from "@/components/shared/Pagination/PaginationSection"
import { QuestionIcon } from "@/icons"

interface Product {
  id: string
  image: string
  title: string
  itemNumber: string
  date: string
  status: "Pending" | "Approved" | "Declined"
  price: number;
  returnRequest?: string;
}

const products: Product[] = [
  {
    id: "1",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Pending",
    price: 20,
    returnRequest: "Rejected"
  },
  {
    id: "2",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
    price: 20,
  },
  {
    id: "3",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Declined",
    price: 20
  },
  {
    id: "4",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
    price: 20
  },
  {
    id: "5",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Declined",
    price: 20
  },
  {
    id: "6",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Approved",
    price: 20
  },
  {
    id: "7",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Declined",
    price: 20
  },
  {
    id: "8",
    image: "/product_image_3.jpg",
    title: "Teen Tops Shirt & Pant...",
    itemNumber: "#A001",
    date: "Feb 10, 2025",
    status: "Pending",
    price: 20
  },
]

export default function UploadedProductListTable() {
  const [statusFilters, setStatusFilters] = useState<string[]>(["Pending", "Approved", "Declined"])

  const handleStatusFilterChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilters([...statusFilters, status])
    } else {
      setStatusFilters(statusFilters.filter((s) => s !== status))
    }
  }

  const filteredProducts = products.filter((product) => statusFilters.includes(product.status))

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Pending":
        return "text-blue-600"
      case "Approved":
        return "text-green-600"
      case "Declined":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="w-full">
      <div className="hidden md:block border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black">

              <TableHead className="text-white font-medium">Image</TableHead>
              <TableHead className="text-white font-medium">Product Title</TableHead>
              <TableHead className="text-white font-medium">Item Number</TableHead>
              <TableHead className="text-white font-medium text-center">Size</TableHead>
              <TableHead className="text-white font-medium text-center">Condition</TableHead>
              <TableHead className="text-white font-medium text-center">Price</TableHead>
              <TableHead className="text-white font-medium">Date</TableHead>
              <TableHead className="text-white font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-auto p-0 text-white hover:bg-gray-800 hover:text-white">
                      <div className="flex items-center gap-1">
                        Status
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Pending")}
                      onCheckedChange={(checked) => handleStatusFilterChange("Pending", checked)}
                    >
                      <span className="text-blue-600">Pending</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Approved")}
                      onCheckedChange={(checked) => handleStatusFilterChange("Approved", checked)}
                    >
                      <span className="text-green-600">Approved</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Declined")}
                      onCheckedChange={(checked) => handleStatusFilterChange("Declined", checked)}
                    >
                      <span className="text-red-600">Declined</span>
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
                  <Link href={`/shop/2`}>
                    <div className="w-12 h-12 relative rounded overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="font-medium"> <Link href={`/shop/2`}>{product.title} </Link></TableCell>
                <TableCell className="text-gray-600">  <Link href={`/shop/2`}> {product.itemNumber} </Link></TableCell>
                <TableCell className="text-center">UK 10</TableCell>
                <TableCell className="text-center">2 months used</TableCell>
                <TableCell className="text-center">${product.price}</TableCell>
                <TableCell className="text-gray-600">{product.date}</TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${getStatusColor(product.status)}`}>{product.status}</span>
                </TableCell>
                <TableCell className="flex items-center gap-x-1">

                  <Trash2 color="red" className="size-5 cursor-pointer" />
                  {
                    (product.status === "Pending" || product.status === "Approved") && <Link href={"/sell-products"}> <SquarePen className="size-5 cursor-pointer" /></Link>
                  }
                  {
                    product.status === "Declined" && <QuestionIcon className="cursor-pointer" />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="text-sm font-medium text-gray-600">{filteredProducts.length} Items</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-transparent">
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("Pending")}
                onCheckedChange={(checked) => handleStatusFilterChange("Pending", checked)}
              >
                <span className="text-green-600">Pending</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("Approved")}
                onCheckedChange={(checked) => handleStatusFilterChange("Approved", checked)}
              >
                <span className="text-blue-600">Approved</span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={statusFilters.includes("Declined")}
                onCheckedChange={(checked) => handleStatusFilterChange("Declined", checked)}
              >
                <span className="text-red-600">Declined</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow relative">

            <div className="absolute  top-2 right-2 flex gap-x-2">
              <Trash2 color="red" className="size-5 cursor-pointer" />
              {
                (product.status === "Pending" || product.status === "Approved") && <Link href={"/sell-products"}> <SquarePen className="size-5 cursor-pointer" /></Link>
              }
              {
                product.status === "Declined" && <QuestionIcon className="cursor-pointer" />
              }
            </div>

            <div className="flex gap-3 mb-3">
              <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                <Link href={`/shop/${product.id}`}>  <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" /> </Link>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate"><Link href={`/shop/${product.id}`}> {product.title} </Link></p>
                <p className="text-xs text-gray-600"><Link href={`/shop/${product.id}`}> {product.itemNumber} </Link></p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-medium ${getStatusColor(product.status)}`}>{product.status}</span>

                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs border-t pt-2">
              <div>
                <span className="text-gray-600">Size: </span>
                <span className="font-medium">UK 10</span>
              </div>
              <div>
                <span className="text-gray-600">Condition: </span>
                <span className="font-medium">2 months used</span>
              </div>

              <div>
                <span className="text-gray-600">Price: </span>
                <span className="font-medium">${product.price}</span>
              </div>
              <div >
                <span className="text-gray-600">Date: </span>
                <span className="font-medium">{product.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <PaginationSection className="mt-3" />
      </div>
    </div>
  )
}




