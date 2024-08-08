"use client";
import { Box } from "@chakra-ui/react";
import { getBusinessStatus } from "@supabaseutils/model/BusinessHours";
import { useSession } from "@supabaseutils/supabase.provider";
import { dbStore } from "@utils/db/IndexedDBUtil";
import { useEffect, useState } from "react";

const BussinesStatus = () => {
  const { tenant, session } = useSession();
  const [status, setStatus] = useState<string>();

  useEffect(() => {
    // const run = async () => {
    //   const stored = await dbStore(session.id).get(
    //     `business-hours-${tenant?.id}`
    //   );
    //   const sts = getBusinessStatus(stored);
    //   setStatus(sts);
    // };

    // session && run();
  }, [session]);

  return (
    <Box
      width="20px"
      height="20px"
      borderRadius="50%"
      bg={status === "Open" ? "lightgreen" : "gray"}
      style={{ boxShadow: status === "Open" ? "0 0 10px green" : "none" }}
    ></Box>
  );
};

export default BussinesStatus;
