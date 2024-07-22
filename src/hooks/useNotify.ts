import { useAppContext } from "@context/app-context";
import { useCallback } from "react";

export default function useNotify() {
  const { dispatch } = useAppContext();

  const notify = useCallback(
    ({
      status,
      description,
    }: {
      status: "success" | "error" | "warning" | "info";
      description: string;
    }) => {
      dispatch({
        type: "NOTIFY",
        payload: {
          status,
          description,
        },
      });
    },
    [dispatch]
  );

  return notify;
}
