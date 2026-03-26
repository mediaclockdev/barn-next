import DealsLayout from "@/src/components/deals/DealsLayout";
import React from "react";

import { getDeals } from "@/src/utils/deals-api";

export default async function DealsPage({ 
  searchParams 
}: { 
  searchParams: Record<string, string | string[] | undefined> 
}) {
  let dealsData: any = { deals: [], totalPages: 1, totalItems: 0 };

  try {
    // 🔌 PLUG AND PLAY: Fetching deals with dynamic pagination!
    // The current page is pulled directly from the URL (e.g., /deals?page=2)
    const page = parseInt((searchParams?.page as string) || "1", 10);
    dealsData = await getDeals({ page, per_page: 12 });
  } catch (error) {
    console.warn("Deals API not ready yet (waiting for real endpoint in api-endpoints.ts)");
  }

  return (
    <div>
      {/* Pass the data into your layout once ready: */}
      {/* <DealsLayout deals={dealsData.deals} totalPages={dealsData.totalPages} /> */}
      <DealsLayout />
    </div>
  );
}
