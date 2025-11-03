import { useCallback, useEffect, useState } from "react";
import { DateRange } from "../type";
import { formatDateRange } from "../utils";

export type PointsData = {
  address: string;
  points: number;
};

export type PointsApiResponse = {
  data: Array<{
    account_id: string;
    address: string;
    points: number;
  }>;
};

/**
 * Recursively fetches all pages of points data from the API.
 * Handles pagination internally - caller gets all results at once.
 */
async function fetchAllPointsData(
  fromDate: string,
  toDate: string,
  endpoint: string,
): Promise<PointsData[]> {
  const allPoints: PointsData[] = [];
  let pageNumber = 1;

  while (true) {
    const params = new URLSearchParams({
      fromDate,
      toDate,
      size: "1000",
      page: pageNumber.toString(),
    });

    const url = `${endpoint}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch points page ${pageNumber}: ${response.statusText}`,
      );
    }

    const data: PointsApiResponse = await response.json();
    const items = data.data || [];

    // Transform API response to internal format
    allPoints.push(
      ...items.map((item) => ({
        address: item.address.toLowerCase(),
        points: item.points,
      })),
    );

    // Stop if we got fewer items than page size (last page)
    if (items.length < 1000) {
      break;
    }

    pageNumber++;
  }

  return allPoints;
}

export function usePointsData(dateRange?: DateRange | null, endpoint?: string) {
  const [rows, setRows] = useState<PointsData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetch = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to || !endpoint) {
      setRows([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const allPoints = await fetchAllPointsData(
        formatDateRange(dateRange.from),
        formatDateRange(dateRange.to),
        endpoint,
      );
      setRows(allPoints);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Unknown error fetching points");
      setError(error);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, endpoint]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    rows,
    isLoading,
    error,
  };
}
