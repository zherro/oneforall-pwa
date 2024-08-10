import { Collapse, useDisclosure } from "@chakra-ui/react";
import Box from "@component/Box";
import { Button } from "@component/buttons";
import MiniTtile from "@component/custom/MiniTitle";
import TextFieldMoney from "@component/custom/TextFieldMoney";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";

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
          value={values.price}
          setFieldValue={setFieldValue}
          errorText={touched.price && errors.price}
          max={999999.99}
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
                value={values.discount}
                setFieldValue={setFieldValue}
                errorText={touched.discount && errors.discount}
                onChange={(value: number) =>
                  setFieldValue(
                    "discount_percent",
                    ((value * 100) / values.price).toFixed(2)
                  )
                }
                max={+values.price}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextFieldMoney
                id="discount_percent"
                label="Desconto em %"
                handleBlur={handleBlur}
                value={values.discount_percent}
                setFieldValue={setFieldValue}
                errorText={touched.discount_percent && errors.discount_percent}
                onChange={(value: number) =>
                  setFieldValue(
                    "discount",
                    ((values.price / 100) * value).toFixed(2)
                  )
                }
                max={100.0}
              />
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default PriceStep;
