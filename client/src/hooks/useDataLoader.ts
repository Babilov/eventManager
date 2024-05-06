import { useEffect, useState } from "react";

export const useDataLoader = <T>(getData: () => Promise<T>, deps: any = []) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setData(data);
      } catch (e: any) {
        console.log(e);
        setError(e.message || "Ошибка загрузки данных");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, deps);
  return { data, isLoading, error };
};
