"use client";
import { createColumns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Customer } from "@/types/types";
import React from "react";
import { customersUrl } from "./backend/backend";
import Loader from "@/components/loader";
export default function App() {
  const { data, isPending } = useGetData(customersUrl, "allCustomer");
  const customersData = data?.data;
  const columns = createColumns<Customer>(["name"]);
  if (isPending) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Customers" />
      </div>
      {customersData && (
        <DataTable
          columns={columns}
          data={customersData}
          filterKeys={["name"]}
          filterPlaceholder="Filter name..."
        />
      )}
    </>
  );
}
