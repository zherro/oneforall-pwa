import TextField from "@component/text-field";
import { maskMoney } from "@lib/mask/lib/mask";

interface TextFieldMoney {
  id: string;
  label: string;
  handleBlur: any;
  value: any;
  setFieldValue: Function;
  errorText: any;
  onChange?: Function;
  digits?: number;
  max?: number;
  mt?: string;
}

const getMask = (digits: number) => {
  switch (digits) {
    case 6:
      return ["9.999", "99.999", "999.999", "9999.99"];
    default:
      return "9.999";
  }
};

const TextFieldMoney = ({
  id,
  label,
  handleBlur,
  value,
  setFieldValue,
  errorText,
  onChange,
  digits = 0,
  max = 99999999999999999,
  mt = "0rem",
}: TextFieldMoney) => (
  <TextField
    mt={mt}
    fullwidth
    id={id}
    name={id}
    label={label}
    placeholder=""
    onBlur={handleBlur}
    value={value}
    onChange={(e: any) => {
      let vl = maskMoney(e.target.value, undefined, { max });
      setFieldValue(id, vl);
      onChange && onChange(vl);
    }}
    errorText={errorText}
  />
);

export default TextFieldMoney;
