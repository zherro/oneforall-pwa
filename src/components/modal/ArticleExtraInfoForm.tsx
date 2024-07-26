"use client";;
import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import Grid from "../grid/Grid";
import TextField from "../text-field";
import { useEffect, useState } from "react";
import { Button } from "../buttons";
import FlexBox from "../FlexBox";
import { H2 } from "../Typography";
import Divider from "../Divider";
import { CinemaInfo } from "@models/gathu/articles/article.model";
import TagInput from "../TagImput";
import { v4 as uuidv4 } from "uuid";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  event?: Event;
  onChange?: (value) => void;
  data: any;
  dataManager: any;
};

const cinemaStatus = [
  { label: "localizacao", value: "localizacao" },
  { label: "horario", value: "horario" },
  { label: "realizado_por", value: "realizado_por" },
  { label: "onde_comprar", value: "onde_comprar" },
];
// ===================================================

export default function ArticleExtraInfoForm({
  open,
  onClose,
  onChange,
  data,
  dataManager,
}: Props) {
  const [eventData, setEventData] = useState<CinemaInfo>({});

  useEffect(() => {
    setEventData(data);
  }, [data]);

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        p="1rem"
        width="100%"
        maxWidth="800px"
        borderRadius={8}
        position="relative"
      >
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <H2>Disponibilidade</H2>
            <Divider mt="1rem" width="100%" height="1px" bg="gray.400" />
          </Grid>
          <Grid item xs={12}>
            <TagInput
              label="Tipo Informação"
              options={cinemaStatus}
              value={eventData.type}
              onChange={(e) => {
                console.log(e);
                setEventData((ev) => {
                  return { ...ev, type: e };
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullwidth
              name="value"
              id="value"
              label="Informação"
              placeholder="info..."
              value={eventData.value}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, value: e.target.value };
                });
              }}
            />
          </Grid>
          { eventData.type == 'onde_comprar' && (
            <Grid item xs={12}>
            <TextField
              fullwidth
              name="link"
              id="link"
              label="Link"
              placeholder="https://link.com"
              value={eventData.link}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, link: e.target.value };
                });
              }}
            />
          </Grid>
          ) || <></>}

          <Grid item xs={12}>
            <FlexBox justifyContent="end">
              <Button
                type="button"
                onClick={onClose}
                variant="outlined"
                color="error"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={() => {
                  dataManager.upsert(eventData);
                  onClose();
                }}
                ml="1rem"
                variant="contained"
                color="primary"
              >
                Salvar
              </Button>
            </FlexBox>
          </Grid>
        </Grid>

        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon
            className="close"
            color="primary"
            variant="small"
            onClick={onClose}
          >
            Fechar
          </Icon>
        </Box>
      </Card>
    </Modal>
  );
}
