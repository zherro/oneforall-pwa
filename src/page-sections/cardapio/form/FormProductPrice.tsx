import { Collapse, useDisclosure } from "@chakra-ui/react";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import MiniTtile from "@component/custom/MiniTitle";
import TextFieldMoney from "@component/custom/TextFieldMoney";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import { maskMoney } from "@lib/mask/lib/mask";
import NumberUtils from "@utils/helpers/Number.utils";

const PriceStep = ({
  handleBlur,
  values,
  setFieldValue,
  touched,
  errors,
}: any) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <>
      <Box mb="2rem" width="100%" />
      <Grid item xs={6}>
        <TextFieldMoney
          id="price"
          label="Preço - R$"
          handleBlur={handleBlur}
          value={maskMoney(values.price)}
          setFieldValue={setFieldValue}
          errorText={touched.price && errors.price}
          onChange={(value: number) => {
            const v = NumberUtils.onlyNumberToDecimal(value);
            const p = NumberUtils.onlyNumberToDecimal(values.discount_percent);

            if (+v > 0 && +p > 0) {
              setFieldValue("discount", ((+v / 100) * +p).toFixed(2));
            }

            if (+v <= 0) {
              setFieldValue("discount_percent", "000");
              setFieldValue("discount", "000");
            }
          }}
          max={99999999}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          type="button"
          mt="3rem"
          color="primary"
          style={{
            fontWeight: "400",
            textDecoration: "underline",
            float: "right",
            lineHeight: "1.15rem",
          }}
          onClick={onToggle}
        >
          Aplicar desconto
          <Icon size="0.9rem" mt="2px" ml="4px">
            {isOpen ? "chevron-up" : "chevron-down"}
          </Icon>
        </Button>
      </Grid>
      <Collapse in={isOpen} animateOpacity>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MiniTtile fontSize="0.85rem" mt="1.5rem" mb="1rem">
                Desconto direto no item:
              </MiniTtile>
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldMoney
                id="discount"
                label="Preço com desconto"
                handleBlur={handleBlur}
                value={maskMoney(values.discount)}
                setFieldValue={setFieldValue}
                errorText={touched.discount && errors.discount}
                onChange={(value: number) => {
                  const v = NumberUtils.onlyNumberToDecimal(value);
                  const p = NumberUtils.onlyNumberToDecimal(values.price);

                  if (+v > 0 && +p > 0) {
                    setFieldValue(
                      "discount_percent",
                      ((+v * 100) / +p).toFixed(2)
                    );
                  } else {
                    setFieldValue("discount_percent", 0.0);
                  }
                }}
                max={NumberUtils.onlyNumber(values.price)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldMoney
                id="discount_percent"
                label="Desconto em %"
                handleBlur={handleBlur}
                value={maskMoney(values.discount_percent)}
                setFieldValue={setFieldValue}
                errorText={touched.discount_percent && errors.discount_percent}
                onChange={(value: number) => {
                  const v = NumberUtils.onlyNumberToDecimal(value);
                  const p = NumberUtils.onlyNumberToDecimal(values.price);

                  if (+v > 0 && +p > 0) {
                    setFieldValue("discount", ((+p / 100) * +v).toFixed(2));
                  } else {
                    setFieldValue("discount", 0.0);
                  }
                }}
                max={10000}
              />
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default PriceStep;
