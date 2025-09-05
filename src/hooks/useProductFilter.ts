import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useProductFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("search") || "";
  const sortOption = searchParams.get("sort") || "newest";

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = createQueryString("search", e.target.value);
    router.replace(`${pathname}?${newQuery}`);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newQuery = createQueryString("sort", e.target.value);
    router.replace(`${pathname}?${newQuery}`);
  };

  return {
    searchTerm,
    sortOption,
    handleSearchChange,
    handleSortChange,
  };
}
