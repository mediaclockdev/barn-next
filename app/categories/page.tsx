import CategoryLayout from "@/src/components/category/CategoryLayout";
import BreadCrumb from "@/src/components/misc/BreadCrumb";
import React from "react";

const page = () => {
  return (
    <div>
      <BreadCrumb />
      <CategoryLayout />
    </div>
  );
};

export default page;
