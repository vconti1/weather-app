import { Suspense } from "react";
import WeatherDetailsClient from "./client";

export default function WeatherDetailsPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading weather details...</div>}>
      <WeatherDetailsClient />
    </Suspense>
  );
}
