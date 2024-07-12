"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetData = (url: string, queryKey: string) => {
  const getDataRequest = () => {
    return axios.get(url);
  };

  const { data, error, isPending, isSuccess, isError } = useQuery({
    queryKey: [queryKey],
    queryFn: getDataRequest,
  });

  return { data, error, isPending, isSuccess, isError };
};

export default useGetData;
