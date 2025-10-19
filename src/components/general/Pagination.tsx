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

interface PaginationProps {
  totalPages: number;
  page: number;
  searchParams: Record<string, string | string[] | undefined>;
  maxVisiblePages?: number;
  className?: string;
}

function Pagination({
  totalPages,
  page,
  searchParams,
  maxVisiblePages = 5,
  className,
}: PaginationProps) {
  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;
  const pageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      const startPage = Math.max(
        2,
        page - Math.floor((maxVisiblePages - 3) / 2),
      );
      const endPage = Math.min(
        totalPages - 1,
        page + Math.floor((maxVisiblePages - 3) / 2),
      );
      if (startPage > 2) {
        pages.push("ellipsis");
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (endPage < totalPages - 1) {
        pages.push("ellipsis");
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const generatePageLink = (targetPage: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    });
    params.set("page", targetPage.toString());
    return `?${params.toString()}`;
  };

  const goNext = () => {
    const nextPage = page + 1;
    return generatePageLink(nextPage);
  };

  const goPrevious = () => {
    const previousPage = page - 1;
    return generatePageLink(previousPage);
  };

  if (totalPages <= 1) return null;

  return (
    <PaginationRoot className={className}>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={canGoPrevious ? goPrevious() : "#"}
            className={cn({
              "pointer-events-none opacity-50": !canGoPrevious,
            })}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {pageNumbers().map((pageNum, index) => (
          <PaginationItem key={index}>
            {pageNum === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={generatePageLink(pageNum)}
                isActive={pageNum === page}
              >
                {pageNum}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={canGoNext ? goNext() : "#"}
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
