
import { Transaction } from "@/types/types";

export function filterTransactions(transactions: Transaction[], customerId: string): Transaction[] {
  return transactions?.filter(transaction => transaction.customer_id === parseInt(customerId));
}

export function aggregateTransactions(transactions: Transaction[]): Map<string, number> {
  const dateMap = new Map<string, number>();
  transactions?.forEach(transaction => {
    const currentAmount = dateMap.get(transaction.date) || 0;
    dateMap.set(transaction.date, currentAmount + transaction.amount);
  });
  return dateMap;
}

export function mapToChartData(dateMap: Map<string, number>): { date: string, totalAmount: number }[] {
  return Array.from(dateMap.entries())?.map(([date, totalAmount]) => ({
    date,
    totalAmount,
  }));
}
