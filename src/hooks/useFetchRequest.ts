import { useAppContext } from "@context/app-context";
import { useCallback, useState } from "react";
import { PAGINATION_SIZE } from "repository/types";

interface QueryOptions {
  from: string;
  select: string;
  eq: { field: string; value: string }[];
}

const log = (debug, val1, val2?, val3?) =>
  debug && console.log(val1, val2, val3);

export default function useFetchRequest(
  supabase,
  limit: number = PAGINATION_SIZE,
  pageNumber: number=0,
  options = { debug: true }
) {
  const { dispatch } = useAppContext();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const [page, setPage] = useState<number>(pageNumber);
  const [pagesCount, setPagesCount] = useState<number>(1);

  
  const upInsert = useCallback(
    (query, values?) =>
      upInsertSupabase(
        supabase,
        setLoading,
        values,
        dispatch,
        query,
        options.debug
      ),
    [supabase, dispatch]
  );

  const fetchData = useCallback(
    (query, filter?) =>
      getdata(
        supabase,
        setLoading,
        {},
        dispatch,
        query,
        setData,
        limit,
        options.debug
      ),
    [supabase, dispatch]
  );

  return {
    supabase,
    loading,
    data,
    page,
    setPage,
    limit,
    pagesCount,
    upInsert,
    fetchData,
  };
}

const getdata = async (
  supabase,
  setLoading,
  values,
  dispatchMessage,
  query,
  setData,
  limit,
  debug
) => {
  try {
    setLoading(true);

    // const s: SupabaseClient = supabase;

    // const query:PostgrestFilterBuilder<any, any, any, any, any> = s.from(qo.from).select(qo.select);

    // for (let i = 0; i < qo.eq?.length; i++) {
    //   query.eq(qo.eq[i].field, qo.eq[i].value);
    // }

    const { data, error, status, count, page, } = await query;
    if (error) {
      log(debug, error);
      throw error;
    }

    if (data) setData({
        data,
        count,
        page,
        totalPages: count / limit
    });
  } catch (error) {
    log(debug, error);
    notifyError(dispatchMessage);
  } finally {
    setLoading(false);
  }
};

const upInsertSupabase = async (
  supabase,
  setLoading,
  values,
  dispatchMessage,
  query,
  debug
) => {
  try {
    setLoading(true);

    const { error } = await query;
    if (error) {
        log(debug, error);
        throw error;
    }

    notifyUpdate(dispatchMessage);
  } catch (error) {
    notifyError(dispatchMessage);
    log(debug, error);
  } finally {
    setLoading(false);
  }
};

const notifyUpdate = (dispatchMessage) => {
  dispatchMessage({
    type: "NOTIFY",
    payload: {
      status: "success",
      description: "Atualizações concluidas.",
    },
  });
};

const notifyError = (dispatchMessage) => {
  dispatchMessage({
    type: "NOTIFY",
    payload: {
      status: "error",
      description: "Não conseguimos completar a sua solicitação!",
    },
  });
};
