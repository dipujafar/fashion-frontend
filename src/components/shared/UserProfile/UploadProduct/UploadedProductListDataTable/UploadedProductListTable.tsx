"use client"
import { useState } from "react"
import Image from "next/image"
import { Eye, ChevronDown } from "lucide-react"
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

interface Product {
  id: string
  image: string
  title: string
  itemNumber: string
  date: string
  status: "Pending" | "Approved" | "Reject"
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
    status: "Reject",
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
    status: "Reject",
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
    status: "Reject",
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
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [statusFilters, setStatusFilters] = useState<string[]>(["Pending", "Approved", "Reject"])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredProducts.map((product) => product.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, productId])
    } else {
      setSelectedItems(selectedItems.filter((id) => id !== productId))
    }
  }

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
        return "text-green-600"
      case "Approved":
        return "text-blue-600"
      case "Reject":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <Button variant="outline" disabled={selectedItems.length === 0} className="text-sm bg-transparent">
          Mark as Delete
        </Button>
      </div>

      <div className="hidden md:block border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-black hover:bg-black">
              <TableHead className="w-12 text-white">
                <Checkbox
                  checked={filteredProducts.length > 0 && selectedItems.length === filteredProducts.length}
                  onCheckedChange={handleSelectAll}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
              </TableHead>
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
                      <span className="text-green-600">Pending</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Approved")}
                      onCheckedChange={(checked) => handleStatusFilterChange("Approved", checked)}
                    >
                      <span className="text-blue-600">Approved</span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={statusFilters.includes("Reject")}
                      onCheckedChange={(checked) => handleStatusFilterChange("Reject", checked)}
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
                    onCheckedChange={(checked) => handleSelectItem(product.id, checked as boolean)}
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
                <TableCell className="text-gray-600">{product.itemNumber}</TableCell>
                <TableCell className="text-center">UK 10</TableCell>
                <TableCell className="text-center">2 months used</TableCell>
                <TableCell className="text-center">${product.price}</TableCell>
                <TableCell className="text-gray-600">{product.date}</TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${getStatusColor(product.status)}`}>{product.status}</span>
                </TableCell>
                <TableCell>
                  <Link href={`/shop/${product.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4 text-gray-600" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <span className="text-sm font-medium text-gray-600">{filteredProducts.length} items</span>
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
                checked={statusFilters.includes("Reject")}
                onCheckedChange={(checked) => handleStatusFilterChange("Reject", checked)}
              >
                <span className="text-red-600">Reject</span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {filteredProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <div className="flex gap-3 mb-3">
              <Checkbox
                checked={selectedItems.includes(product.id)}
                onCheckedChange={(checked) => handleSelectItem(product.id, checked as boolean)}
                className="mt-1"
              />
              <div className="w-16 h-16 relative rounded overflow-hidden flex-shrink-0">
                <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{product.title}</p>
                <p className="text-xs text-gray-600">{product.itemNumber}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className={`text-xs font-medium ${getStatusColor(product.status)}`}>{product.status}</span>
                  <Link href={`/shop/${product.id}`}>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Eye className="h-3.5 w-3.5 text-gray-600" />
                    </Button>
                  </Link>
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

      <div className="mt-6">
        <PaginationSection />
      </div>
    </div>
  )
}




