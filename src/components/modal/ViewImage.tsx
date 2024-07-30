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
        <Box
          position="absolute"
          width="40px"
          top="0.25rem"
          right="0.25rem"
          cursor="pointer"
        >
          <IconButton
            height="40px"
            className="close"
            color="gray.main"
            size="small"
            onClick={onClose}
          >
            <SemiSpan fontSize="1.25rem" color="primary.main">
              X
            </SemiSpan>
          </IconButton>
        </Box>
      </Card>
    </Modal>
  );
}
