"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Input from "./Input";
function SearchInput({ title }: { title: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );
  const updateURL = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
      setTimeout(() => {
        updateURL(e.target.value);
      }, 500);
    },
    [updateURL],
  );

  return (
    <Input
      container="max-w-sm"
      Icon={Search}
      props={{
        name: "search",
        placeholder: title,
        onChange: onChange,
        value: searchValue,
      }}
    />
  );
}
export default SearchInput;
