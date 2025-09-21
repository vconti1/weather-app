
import { Suspense } from "react";
import Landing from "./landing/client";

export default function Home() {
  return (
     <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <Landing/>
    </Suspense>
  );
}
