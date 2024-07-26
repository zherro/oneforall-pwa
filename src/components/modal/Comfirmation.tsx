import Box from "../Box";
import { Button, IconButton } from "../buttons";
import Card from "../Card";
import FlexBox from "../FlexBox";
import Modal from "../Modal";
import Typography, { H4, SemiSpan } from "../Typography";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: any;
  title: string;
  message: string;
};

// ===================================================

const ComfirmationModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}: Props) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Card
          p="1rem"
          width="350px"
          maxWidth="800px"
          borderRadius={8}
          position="relative"
        >
          <Box>
            <H4>{title}</H4>
          </Box>
          <Box>
            <Typography fontSize="1rem" mt="1.25rem" mb="2rem">
              {message}
            </Typography>
          </Box>
          <FlexBox justifyContent="end">
            <Button
              type="button"
              variant="outlined"
              color="error.main"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="contained"
              bg="primary.main"
              color="white"
              ml="1.25rem"
              onClick={() => onConfirm()}
            >
              Confirmar
            </Button>
          </FlexBox>
          <Box
            position="absolute"
            top="0.75rem"
            right="0.75rem"
            cursor="pointer"
          >
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
    </>
  );
};

export default ComfirmationModal;
