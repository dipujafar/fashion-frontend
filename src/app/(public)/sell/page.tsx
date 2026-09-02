import Container from "@/components/shared/Container";
import AddProductForm from "@/components/shared/UserProfile/AddProduct/AddProductForm";
import React from "react";

export const metadata = {
  title: "Sell Products",
  description: "Sell your products with Fashion!",
}

export default function SellProductPage() {
  return (
    <Container>
      <AddProductForm />
    </Container>
  );
}
