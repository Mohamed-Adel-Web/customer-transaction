"use client";
import { createColumns } from "@/components/columns";
import { DataTable } from "@/components/DataTable";
import Heading from "@/components/Heading";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { Customer, Transaction } from "@/types/types";
import React from "react";
import { customersUrl, transactionUrl } from "../backend/backend";
import Loader from "@/components/loader";
export default function App() {
  const { data: transaction, isPending: isTransactionLoading } = useGetData(
    transactionUrl,
    "allTransactions"
  );
  const transactionData = transaction?.data;
  const { data: customers, isPending: isCustomerLoading } = useGetData(
    customersUrl,
    "allCustomers"
  );
  const customersData = customers?.data;
  const finalTransaction = transactionData?.map((transaction: Transaction) => {
    const customer = customersData?.find(
      (customer: Customer) =>
        Number(customer.id) === Number(transaction.customer_id)
    );
    return {
      ...transaction,
      customer_name: customer ? customer.name : "Unknown",
    };
  });
  const columns = createColumns(["customer_name", "date", "amount"]);
  if (isCustomerLoading || isTransactionLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex justify-between align-items-center">
        <Heading title="Transactions" />
      </div>
      {finalTransaction && (
        <DataTable
          columns={columns}
          data={finalTransaction}
          filterKeys={["amount", "customer_name"]}
          filterPlaceholder="Filter ..."
        />
      )}
    </>
  );
}
