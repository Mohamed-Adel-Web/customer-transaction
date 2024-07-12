export interface LinkItem {
  href: string;
  label: string;
  icon: JSX.Element;
}
export interface Customer {
  id: number;
  name: string;
}
export interface Transaction {
  id: number;
  customer_id: number;
  date: string;
  amount: number;
  customer_name: string;
}
