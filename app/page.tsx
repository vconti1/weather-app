
import { Suspense } from "react";
import LandingClient from "./landing/client";

export default function Home() {
  return (
     <Suspense fallback={<div className="text-center p-8">Loading landing...</div>}>
      <LandingClient />
    </Suspense>
  );
}
