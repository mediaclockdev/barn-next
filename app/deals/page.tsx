import DealsLayout from "@/src/components/deals/DealsLayout";
import React, { Suspense } from "react";

import { getDeals } from "@/src/utils/deals-api";

export default async function DealsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let dealsData: any = { deals: [], totalPages: 1, totalItems: 0 };

  try {
    const page = parseInt((searchParams?.page as string) || "1", 10);
    dealsData = await getDeals({ page, per_page: 12 });
  } catch (error) {
    console.warn(
      "Deals API not ready yet (waiting for real endpoint in api-endpoints.ts)",
    );
  }

  return (
    <div>
      <Suspense fallback={<div>Loading Deals...</div>}>
        <DealsLayout />
      </Suspense>
    </div>
  );
}
