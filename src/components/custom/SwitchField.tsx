import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { SemiSpan } from "@component/Typography";

interface SwitchFieldProps {
    id: string;
    label: string;
    value: any;
    setFieldValue: Function;
    colorScheme?: string;
    isChecked?: boolean;
  }
  
  const SwitchField = ({id, label, value, setFieldValue, colorScheme = "green", isChecked = false}: SwitchFieldProps) => {
    return (
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor={id} mb="0">
          <SemiSpan fontWeight={400}>{label}</SemiSpan>
        </FormLabel>
        <Switch
          isChecked={isChecked}
          colorScheme={colorScheme}
          id={id}
          name={id}
          value={value}
          onChange={(e: any) => setFieldValue(id, e.target.checked)}
        />
      </FormControl>
    );
  };
  
  export default SwitchField;