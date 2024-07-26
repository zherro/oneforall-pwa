"use client";
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
import { CinemaInfo } from "@models/gathu/articles/article.model";
import TagInput from "../TagImput";
import DatePickerField from "../date-picker";

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

const cinemaStatus = [
  { label: "em_breve", value: "em_breve" },
  { label: "esgotado", value: "esgotado" },
  { label: "em_cartaz", value: "em_cartaz" },
  { label: "indisponivel", value: "indisponivel" },
];
// ===================================================

export default function ArticleCinemaForm({
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
              label="Disponibilidade"
              options={cinemaStatus}
              value={eventData.status}
              onChange={(e) => {
                console.log(e);
                setEventData((ev) => {
                  return { ...ev, status: e };
                });
              }}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullwidth
              name="cinema"
              id="cinema"
              label="Cinema"
              placeholder="Cinema"
              value={eventData.cinema}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, cinema: e.target.value };
                });
              }}
            />
          </Grid>
          {(eventData.status == "em_breve" && (
            <Grid item sm={6} xs={12}>
              <DatePickerField
                label="Data do Estréia"
                value={eventData.data_estreia}
                size="large"
                onChange={(date, dateString) => {
                  setEventData((ev) => {
                    return { ...ev, data_estreia: date };
                  });
                }}
              />
            </Grid>
          )) || <></>}
          
          <Grid item xs={12}>
            <TextField
              fullwidth
              name="link"
              id="link"
              label="Ingressos"
              placeholder="Cinema"
              value={eventData.link}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, link: e.target.value };
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
