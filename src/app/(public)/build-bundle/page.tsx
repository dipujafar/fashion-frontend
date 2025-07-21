import React, { Suspense } from "react";
import BuildBundleContainer from "./_components/BuildBundleContainer";

export default function BuildBundle() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuildBundleContainer />
    </Suspense>
  );
}
