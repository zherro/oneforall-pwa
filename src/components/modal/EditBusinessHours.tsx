"use client";
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
import TagInput from "../TagImput";
import TextFieldMoney from "../custom/TextFieldMoney";
import { mask } from "@lib/mask/lib/mask";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any;
  dataManager: any;
};

const daysOfWeek = [
  { label: "Domingo", value: "0" },
  { label: "Segunda-feira", value: "1" },
  { label: "Terça-feira", value: "2" },
  { label: "Quarta-feira", value: "3" },
  { label: "Quinta-feira", value: "4" },
  { label: "Sexta-feira", value: "5" },
  { label: "Sábado", value: "6" },
];

export default function EditBusinessHours({
  open,
  onClose,
  data,
  dataManager,
}: Props) {
  const [businessHours, setBusinessHours] = useState<any>({});

  useEffect(() => {
    setBusinessHours(data);
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
            <H2>Editar Horário de Funcionamento</H2>
            <Divider mt="1rem" width="100%" height="1px" bg="gray.400" />
          </Grid>

          <Grid item xs={12}>
            <TagInput
              label="Dia da Semana"
              options={daysOfWeek}
              value={businessHours.day}
              onChange={(e) => {
                setBusinessHours((ev) => {
                  return { ...ev, day: e };
                });
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullwidth
              name="open"
              label="Horário de Abertura"
              value={businessHours.open}
              onChange={(e) => {
                setBusinessHours((ev) => {
                  return { ...ev, open:  mask(e.target.value, '99:99') };
                });
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullwidth
              name="close"
              label="Horário de Fechamento"
              value={businessHours.close}
              onChange={(e) => {
                setBusinessHours((ev) => {
                  return { ...ev, close: mask(e.target.value, '99:99')};
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
                  dataManager.upsert(businessHours);
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
