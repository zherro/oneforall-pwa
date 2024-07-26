"use client";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Image from "../Image";
import Box from "../Box";
import Icon from "../icon/Icon";
import { IconButton } from "../buttons";
import { SemiSpan } from "../Typography";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  image: any;
};

// ===================================================

export default function ViewImage({ open, onClose, image }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        p="1rem"
        width="100%"
        maxWidth="800px"
        borderRadius={8}
        position="relative"
      >
        <Image
          width="100%"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
          src={image}
        />
        <div style={{ clear: "both" }}></div>
        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <IconButton
            className="close"
            color="primary"
            size="small"
            onClick={onClose}
          >
            <SemiSpan color="primary.main">FECHAR</SemiSpan>
          </IconButton>
        </Box>
      </Card>
    </Modal>
  );
}
