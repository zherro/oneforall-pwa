"use client";;
import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import Grid from "../grid/Grid";
import TextField from "../text-field";
import { StatusEntity } from "@models/types/StatusEntity";
import { useEffect, useState } from "react";
import TextFieldMoney from "../custom/TextFieldMoney";
import Select from "../Select";
import { Button } from "../buttons";
import FlexBox from "../FlexBox";
import { H2 } from "../Typography";
import Divider from "../Divider";
import { PriceInfo } from "@models/gathu/articles/article.model";

// ===================================================
type Props = {
  open: boolean;
  onClose: () => void;
  event?: Event;
  onChange?: (value) => void;
  data: any;
  dataManager: any;
};

type Event = {
  status?: StatusEntity;
  setor?: string;
  lote?: string;
  price?: number;
};

const eventPassSalesTypes = [
  { label: "Em Breve", value: "waiting" },
  { label: "Vendas Abertas", value: "open" },
  { label: "Esgotado", value: "selled_all" },

  { label: "Em Cartaz", value: "en_cartaz" },

];
// ===================================================

export default function ArticleEventForm({
  open,
  onClose,
  onChange,
  data,
  dataManager,
}: Props) {
  const [eventData, setEventData] = useState<PriceInfo>({});

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
            <H2>Preços e Setores</H2>
            <Divider mt="1rem" width="100%" height="1px" bg="gray.400" />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Select
              // isMulti
              id="event_id"
              label="Situação"
              options={eventPassSalesTypes}
              placeholder="Selecione"
              value={eventPassSalesTypes.filter(
                (e) => e.value == eventData.status
              )}
              onChange={(value: any) => {
                setEventData((ev) => {
                  return { ...ev, status: value.value };
                });
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullwidth
              name="event_lote"
              id="event_lote"
              label="Lote"
              placeholder="Lote #"
              value={eventData.lote}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, lote: e.target.value };
                });
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullwidth
              name="event_setor"
              id="event_setor"
              label="Setor"
              placeholder="Setor #"
              value={eventData.setor}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, setor: e.target.value };
                });
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextFieldMoney
              digits={15}
              id="price"
              label="Valor"
              value={eventData.price}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, price: e };
                });
              }}
            />
          </Grid>

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
