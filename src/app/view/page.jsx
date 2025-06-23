import { Suspense } from "react";
import ViewClient from "@/components/view/view-client";

export const dynamic = "force-dynamic";

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <ViewClient />
    </Suspense>
  );
}
