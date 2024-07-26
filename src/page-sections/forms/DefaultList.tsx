"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import Avatar from "@component/avatar";
import Hidden from "@component/hidden";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import TableRow from "@component/TableRow";
import Pagination from "@component/pagination";
import { Button, IconButton } from "@component/buttons";
import Typography, { H5 } from "@component/Typography";

import { MetaPagination } from "interfaces";
import StatusLabel from "@component/StatusLabel";
import ComfirmationModal from "@component/modal/Comfirmation";
import ImageUtils from "@utils/image";
import { StatusEntity } from "@supabaseutils/model/types/Status.type";
import { Field } from "formik";

// ==============================================================
interface Props {
  meta?: MetaPagination;
  data: any[];
  dataMap: { field: any; type: "key" | "text" | "status" | "img" }[];
  deletePost?: any;
  setPage?: any;
  api_uri: string;
}
// ==============================================================

export default function DefaultList({
  meta,
  data,
  dataMap,
  deletePost,
  setPage,
  api_uri,
}: Props) {
  const path = usePathname();
  const { push } = useRouter();
  const [openDialog, setOpenDialog] = useState({
    open: false,
    value: {},
  });

  const toggleDialog = useCallback(
    () =>
      setOpenDialog((open) => ({
        ...openDialog,
        open: !open.open,
      })),
    [openDialog]
  );

  const [confimDeletePost, setDeletePost] = useState<string>();

  const FormField = ({ field, value }) => {
    switch (field.type) {
      case "text":
        return (
          <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
            {/* <Avatar src={ImageUtils.getMini(value.img)} size={40} /> */}
            <Typography textAlign="left" ml="20px">
              {value[field.field]}
            </Typography>
          </FlexBox>
        );
      case "status":
        return (
          <H5 m="6px" textAlign="left" fontWeight="400">
            <StatusLabel status={value[field.field]} />
          </H5>
        );
      default:
        return <></>;
    }
  };

  const Actions = ({ id }: { id: string }) => {
    return (
      <>
        <H5 m="6px" textAlign="left" fontWeight="400">
          <Button
            onClick={() => {
              setDeletePost(id);
              toggleDialog();
            }}
          >
            Excluir
          </Button>
        </H5>
        <Link href={`${path}/${id}`} passHref>
          <FlexBox>
            <H5 m="6px" textAlign="left" fontWeight="400">
              Editar
            </H5>

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton>
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
          </FlexBox>
        </Link>
      </>
    );
  };

  return (
    <>
      <ComfirmationModal
        title="Excluir publicação"
        message="Deseja realmente excluir esta publicação?"
        open={openDialog.open}
        onClose={toggleDialog}
        onConfirm={() => {
          deletePost(confimDeletePost);
          toggleDialog();
        }}
      />

      {data?.map((item) => (
        <TableRow key={item.id} my="1rem" padding="6px 18px">
          <>
            {dataMap?.map((field, idx) => (
              <>
                <FormField key={idx} field={field} value={item} />
              </>
            ))}
            <Actions id={item.id} />
          </>
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          page={meta?.page || 0}
          pageCount={Math.ceil((meta?.total || 0) / (meta?.size || 1)) || 1}
          onChange={(data) => setPage(data + 1)}
        />
      </FlexBox>
    </>
  );
}
