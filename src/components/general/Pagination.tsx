"use client";
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

interface PaginationProps {
  total: number;
  page: number;
  pageSize: number;
}

function Pagination({ total, page, pageSize }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = useMemo(
    () => Math.ceil(total / pageSize),
    [total, pageSize],
  );

  const createPageURL = useCallback(
    (pageNumber: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", pageNumber.toString());
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      router.push(createPageURL(pageNumber));
    },
    [router, createPageURL],
  );

  const createPageLink = useCallback(
    (pageNum: number) => (
      <PaginationItem key={pageNum}>
        <PaginationLink
          href={createPageURL(pageNum)}
          isActive={page === pageNum}
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(pageNum);
          }}
        >
          {pageNum}
        </PaginationLink>
      </PaginationItem>
    ),
    [page, createPageURL, handlePageChange],
  );

  const getPageRange = useMemo(() => {
    if (totalPages <= 7) {
      return {
        type: "simple",
        pages: Array.from({ length: totalPages }, (_, i) => i + 1),
      };
    }

    if (page <= 4) {
      return { type: "start", pages: [1, 2, 3, 4, 5] };
    }

    if (page >= totalPages - 3) {
      return {
        type: "end",
        pages: Array.from({ length: 5 }, (_, i) => totalPages - 4 + i),
      };
    }

    return { type: "middle", pages: [page - 1, page, page + 1] };
  }, [page, totalPages]);

  const renderPageNumbers = useMemo(() => {
    const { type, pages } = getPageRange;

    if (type === "simple") {
      return pages.map(createPageLink);
    }

    const items = [];

    if (type === "start") {
      items.push(...pages.map(createPageLink));
      items.push(<PaginationEllipsis key="ellipsis" />);
      items.push(createPageLink(totalPages));
    } else if (type === "end") {
      items.push(createPageLink(1));
      items.push(<PaginationEllipsis key="ellipsis" />);
      items.push(...pages.map(createPageLink));
    } else {
      items.push(createPageLink(1));
      items.push(<PaginationEllipsis key="ellipsis1" />);
      items.push(...pages.map(createPageLink));
      items.push(<PaginationEllipsis key="ellipsis2" />);
      items.push(createPageLink(totalPages));
    }

    return items;
  }, [getPageRange, createPageLink, totalPages]);

  if (totalPages <= 1) return null;

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  return (
    <PaginationRoot>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={canGoPrevious ? createPageURL(page - 1) : "#"}
            onClick={(e) => {
              e.preventDefault();
              if (canGoPrevious) handlePageChange(page - 1);
            }}
            className={cn({
              "pointer-events-none opacity-50": !canGoPrevious,
            })}
          />
        </PaginationItem>

        {renderPageNumbers}

        <PaginationItem>
          <PaginationNext
            href={canGoNext ? createPageURL(page + 1) : "#"}
            onClick={(e) => {
              e.preventDefault();
              if (canGoNext) handlePageChange(page + 1);
            }}
            className={cn({
              "pointer-events-none opacity-50": !canGoNext,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}

export default Pagination;
