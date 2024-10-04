import { Can } from "@/components/Can"
import { ProductList } from "@/components/ProductList"
import { useFilterProducts, useGetProducts } from "@/features/use-products"
import { UtilsBar } from "@/components/UtilsBar"
import { useEffect, useState } from "react"
import { useDebounce } from "@/features/useDebounce"
import { useGetCategories } from "@/features/use-categories"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import { Spinner } from "@/components/ui/spinner"

export function Products() {
  const [page, setPage] = useState<number>(0)
  const [searchTerm, setSearchTerm] = useState<string>("")
  const debouncedSearchTerm = useDebounce(searchTerm, 200)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories")
  const [allCategories, isFetchingCategories, errorCategories] = useGetCategories()

  const [currentPage, setCurrentPage] = useState(1)

  const size_default = 6 // Default number of products per page

  const [filterResult, isFetching, error] = useFilterProducts({
    name: debouncedSearchTerm,
    category: selectedCategory,
    page,
    size: size_default
  })

  const {
    content = [],
    totalPages = 0,
    totalElements = 0,
    number = 0,
    size = size_default
  } = filterResult || {}

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setPage(newPage - 1)
  }

  if (isFetching || isFetchingCategories) {
    return <Spinner size="large" className="h-screen items-center justify-center" />
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className="p-2">
      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() => (
          <div>
            <UtilsBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              allCategoryNames={allCategories
                .map((c) => c.name)
                .filter((name): name is string => name !== null)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <Pagination className="mt-4 mb-4" currentPage={currentPage} lastPage={totalPages}>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    aria-disabled={currentPage === 1}
                  />
                </PaginationItem>
                {pageNumbers.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNumber)}
                      isActive={currentPage === pageNumber}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    aria-disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <ProductList products={content} />
          </div>
        )}
      />
    </div>
  )
}
