import { useCallback } from "react";

const content = {
  "Content-Type": "application/json",
};

interface RequestProps {
  method?: "POST" | "GET" | "UPDATE" | "PUT" | "DELETE" | "PATH";
  headers?: any;
  body?: any;
}

export default function useFetch() {
  const fetchData = useCallback(
    async (
      uri: string,
      props?: RequestProps,
      successCallback: Function = () => {},
      errorCallback: Function = () => {}
    ) => {
      fetch(uri, {
        method: props?.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...(props?.headers || {}),
        },
        body: props?.body,
      })
        .then((response) => response.json())
        .then((data) => {
          // IF response is error
          if (data?.statusCode > 299) errorCallback(data);
          else successCallback(data);
        })
        .catch((error) => errorCallback(error));
    },
    []
  );

  return fetchData;
}
