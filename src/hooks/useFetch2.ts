"use client";;
import MESSAGES from "@data/messages";
import { LOG } from "@utils/log";

const content = {
  "Content-Type": "application/json",
};

interface RequestProps {
  method?: "POST" | "GET" | "UPDATE" | "PUT" | "DELETE" | "PATH";
  headers?: any;
  body?: any;
}
export default function useFetch(uri: string, options, config: FetchOptions) {
  const useFetchClbk = async () => {
    config.onLoading && config.onLoading(true);

    LOG.debug("Start Fetch " + options.method);

    fetch(uri, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(config.handleData)
        config.onLoading && config.onLoading(false);
        // IF response is error
        if (data?.statusCode > 299 && config.handleError) {
          LOG.debug(data);
          config.handleError(data);
        } else config.handleData && config.handleData(data);
      })
      .catch((error) => {
        LOG.debug(error);
        config.onLoading && config.onLoading(false);
        config.handleError &&
          config.handleError({
            status: "error",
            message: MESSAGES.ERROR_NOT_COMPLETE_REQUEST,
          });
      });
  };

  return useFetchClbk;
}

type FetchOptions = {
  notify?: boolean;
  headers?: any;
  handleData?: any;
  handleError?: any;
  onLoading?: any;
};

const SafeFetchOptions: FetchOptions = {
  notify: false,
  headers: {},
  handleData: (data) => {},
  handleError: (err) => {},
  onLoading: (loading) => {},
};

const fetchGet = (url, config: FetchOptions = SafeFetchOptions) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };

  const fetch = useFetch(url, options, config);
  fetch();
};

const fetchPost = (url, body, config: FetchOptions = SafeFetchOptions) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(body),
  };

  const fetch = useFetch(url, options, config);
  fetch();
};

const fetchPut = (url, body, config: FetchOptions = SafeFetchOptions) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
    body: JSON.stringify(body),
  };

  return useFetch(url, options, config);
};

const fetchDelete = (url, config: FetchOptions = SafeFetchOptions) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  };

  return useFetch(url, options, config);
};

export { fetchGet, fetchPost, fetchPut, fetchDelete };
