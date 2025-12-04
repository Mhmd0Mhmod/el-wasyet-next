"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ClientPaginationProps {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export default function ClientPagination({
  pageNumber,
  setPageNumber,
  totalPages,
  hasNextPage,
  hasPreviousPage,
}: ClientPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center">
      <Pagination dir="rtl">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
              className={
                !hasPreviousPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => {
              // Show first page, last page, current page, and pages around current
              const showPage =
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= pageNumber - 1 && pageNum <= pageNumber + 1);

              // Show ellipsis
              const showEllipsisBefore =
                pageNum === pageNumber - 2 && pageNumber > 3;
              const showEllipsisAfter =
                pageNum === pageNumber + 2 && pageNumber < totalPages - 2;

              if (showEllipsisBefore || showEllipsisAfter) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }

              if (!showPage) return null;

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setPageNumber(pageNum)}
                    isActive={pageNum === pageNumber}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            },
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                setPageNumber(Math.min(totalPages, pageNumber + 1))
              }
              className={
                !hasNextPage
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
