"use client";
import Box from "@component/Box";
import Card from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import Grid from "../grid/Grid";
import TextField from "../text-field";
import { StatusEntity } from "@models/types/StatusEntity";
import { useEffect, useState } from "react";
import { Button } from "../buttons";
import FlexBox from "../FlexBox";
import { H2 } from "../Typography";
import Divider from "../Divider";
import { ExtraInfoV2 } from "@models/gathu/articles/article.model";
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

const infoTypes = [
  { label: "texto_livre", value: "texto_livre" },
  { label: "link", value: "link" },
  { label: "telefone", value: "telefone" },
  { label: "localizacao", value: "localizacao" },
];
// ===================================================

export default function ArticleExtraInfoFormV2({
  open,
  onClose,
  onChange,
  data,
  dataManager,
}: Props) {
  const [eventData, setEventData] = useState<ExtraInfoV2>({});

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
            <H2>Typo</H2>
            <Divider mt="1rem" width="100%" height="1px" bg="gray.400" />
          </Grid>
          <Grid item xs={12}>
            <TagInput
              label="Tipo"
              options={infoTypes}
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
              name="label"
              id="label"
              label="Titulo/Descrição"
              value={eventData.label}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, label: e.target.value };
                });
              }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullwidth
              name="value"
              id="value"
              label="Informação/Valor"
              value={eventData.value}
              onChange={(e) => {
                setEventData((ev) => {
                  return { ...ev, value: e.target.value };
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
