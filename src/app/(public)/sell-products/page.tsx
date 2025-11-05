import Container from "@/components/shared/Container";
import AddProductForm from "@/components/shared/UserProfile/AddProduct/AddProductForm";
import React, { Suspense } from "react";

export default function SellProductPage() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductForm />
      </Suspense>
    </Container>
  );
}
