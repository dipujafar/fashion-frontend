import React, { Suspense } from "react";
import Container from "@/components/shared/Container";
import AddProductForm from "@/components/shared/UserProfile/AddProduct/AddProductForm";

export default function AddProductPage() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductForm />
      </Suspense>
    </Container>
  );
}
