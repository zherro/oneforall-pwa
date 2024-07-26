"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// ==============================================================
interface Props {
  meta?: MetaPagination;
  data: {
    id: string | any;
    title: string | any;
    status: StatusEntity | any;
    img: string | any;
  }[] | any;
  deletePost?: any;
  setPage?: any;
  editLink?: string;
}
// ==============================================================

export default function DefaultList({
  meta,
  data,
  deletePost,
  setPage,
  editLink,
}: Props) {
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
          <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
            <Avatar src={ImageUtils.getMini(item.img)} size={40} />
            <Typography textAlign="left" ml="20px">
              {item.title}
            </Typography>
          </FlexBox>

          <H5 m="6px" textAlign="left" fontWeight="400">
            <StatusLabel status={item.status} />
          </H5>
          <H5 m="6px" textAlign="left" fontWeight="400">
            <Button
              onClick={() => {
                setDeletePost(item.id);
                toggleDialog();
              }}
            >
              Excluir
            </Button>
          </H5>
          <Link href={`${editLink}/${item.id}`} passHref>
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
        </TableRow>
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          page={meta.page}
          pageCount={Math.ceil((meta?.total || 0) / (meta?.size || 1)) || 1}
          onChange={(data) => setPage(data + 1)}
        />
      </FlexBox>
    </>
  );
}
