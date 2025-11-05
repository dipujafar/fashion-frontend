import Container from "@/components/shared/Container";
import AddProductForm from "@/components/shared/UserProfile/AddProduct/AddProductForm";
import { Suspense } from "react";

export default function AddProductPage() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <AddProductForm />
      </Suspense>
    </Container>
  );
}
