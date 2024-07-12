"use client";
import { useState, useMemo } from "react";
import ReactECharts from 'echarts-for-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useGetData from "@/customHooks/crudHooks/useGetData";
import { customersUrl, transactionUrl } from "../backend/backend";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Customer } from "@/types/types";
import { aggregateTransactions, filterTransactions, mapToChartData } from "@/lib/transactionUtils";
export default function CustomerTransactions() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const { data: transactions } = useGetData(transactionUrl, "allTransactions");
  const { data: customers } = useGetData(customersUrl, "allCustomers");

  const chartData = useMemo(() => {
    if (!selectedCustomerId || !transactions?.data) return [];
    const filteredTransactions = filterTransactions(transactions.data, selectedCustomerId);
    const dateMap = aggregateTransactions(filteredTransactions);
    return mapToChartData(dateMap);
  }, [selectedCustomerId, transactions]);

  const options = {
    title: {
      text: 'Customer Transactions',
      subtext: 'Total transactions per day',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.date),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Total Amount',
        type: 'bar',
        data: chartData.map(item => item.totalAmount),
        itemStyle: {
          color: '#5470C6',
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription>Select a customer to see their transactions.</CardDescription>
        <Select
          value={selectedCustomerId}
          onValueChange={setSelectedCustomerId}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Customer</SelectLabel>
              {customers?.data?.map((customer: Customer) => (
                <SelectItem key={customer.id} value={String(customer.id)}>
                  {customer.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ReactECharts option={options} />
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
    
        <div className="leading-none text-muted-foreground">
          Showing total transactions per day for the selected customer.
        </div>
      </CardFooter>
    </Card>
  );
}
