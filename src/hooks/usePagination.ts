import { useState, useEffect, useCallback } from "react";
import useFetch, { fetchDelete, fetchGet } from "./useFetch2";
import { API_ROUTES } from "@routes/app.routes";
import useNotify from "./useNotify";

interface PaginationOptions {
  page: number;
  limit: number;
}

interface DataProps<T> {
  data?: any[] | T[];
  page?: number;
  size?: number;
  total?: number;
}

interface PaginationResult<T> {
  items: T[];
  meta: {
    itemCount: number;
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export const usePagination = <T>(
  url: string,
  initialOptions: PaginationOptions = { page: 0, limit: 20 }
) => {
  const notify = useNotify();

  const [page, setPage] = useState<number>();
  const [data, setData] = useState<DataProps<T> | null>(null);
  const [options, setOptions] = useState<PaginationOptions>(initialOptions);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleting, isDeleting] = useState<boolean>(false);

  //   const fetchData = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(
  //         `${url}?page=${options.page}&limit=${options.limit}`
  //       );
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       setError("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    fetchGet(url, {
      notify: true,
      headers: {},
      handleData: setData,
      handleError: (error: any) => {
        notify({
          status: "error",
          description: error.message,
        });
      },
      onLoading: setLoading,
    });
  }, [options]);

  const deletePost = useCallback((id) => {
    fetchDelete(`${url}/${id}`, {
      notify: true,
      headers: {},
      handleData: notify({
        status: "success",
        description: "Publicação excluida!",
      }),
      handleError: (error: any) =>
        notify({
          status: "error",
          description: error.message,
        }),
      onLoading: setLoading,
    });
  }, []);

  const handlePageChange = (newPage: number) => {
    setOptions((prevOptions) => ({ ...prevOptions, page: newPage }));
  };

  return {
    data,
    loading,
    deleting,
    error,
    page,
    setPage,
    deletePost,
    handlePageChange,
  };
};
