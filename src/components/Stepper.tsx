import { FC, Fragment, useEffect, useState } from "react";
import Box from "./Box";
import { Chip, ChipSquare } from "./Chip";
import FlexBox from "./FlexBox";

type Step = { title: string; disabled: boolean; selected?: boolean , hidden?: boolean};

type StepperProps = {
  stepperList: Step[];
  selectedStep?: number;
  square?: boolean;
  showStepIdx?: boolean;
  aligin?: "center" | "start" | "end";
  onChange?: (Step: Step, index: number) => void;
  select?: number;
};

const Stepper: FC<StepperProps> = ({
  selectedStep = 1,
  stepperList,
  onChange,
  square,
  showStepIdx,
  aligin,
  select = 0,
}) => {
  const [selected, setSelected] = useState<number>(
    (selectedStep ? selectedStep : 1) - 1
  );

  const handleStepClick = (step: Step, ind: number) => () => {
    if (!step.disabled) {
      setSelected(ind);
      if (onChange) onChange(step, ind+1);
    }
  };

  useEffect(() => {
      setSelected(select);

      if (onChange)
        onChange(
          {
            title: "",
            disabled: false,
          },
          select
        );
  }, [select]);

  useEffect(
    () => setSelected((selectedStep ? selectedStep : 1) - 1),
    [selectedStep]
  );

  return (
    <FlexBox
      alignItems="center"
      flexWrap="wrap"
      justifyContent={aligin ? aligin : "center"}
      my="-4px"
      borderBottom="1px solid #cdcdcd"
    >
      {stepperList.map((step, ind) => (
        <Fragment key={step.title}>
          {square && !step.hidden && (
            <ChipSquare
              mt="4px"
              fontSize="14px"
              fontWeight="300"
              p="0.5rem 1.5rem"
              color={
                step.disabled && ind !== selected ? "gray.500" : "primary.main"
              }
              cursor={
                step.disabled && ind !== selected ? "not-allowed" : "pointer"
              }
              bg="gray.white"
              onClick={handleStepClick(step, ind)}
              boderColor={
                ind == selected ? "primary.main" : "colors.gray.white"
              }
            >
              {showStepIdx ? ind + 1 + ". " : ""}
              {step.title}
            </ChipSquare>
          )}
          {!square && !step.hidden && (
            <Chip
              my="4px"
              fontSize="14px"
              fontWeight="600"
              p="0.5rem 1.5rem"
              color={ind <= selected ? "white" : "primary.main"}
              cursor={step.disabled ? "not-allowed" : "pointer"}
              bg={ind <= selected ? "primary.main" : "primary.light"}
              onClick={handleStepClick(step, ind)}
            >
              {ind + 1}. {step.title}
            </Chip>
          )}

          {!square && !step.hidden && ind < stepperList.length - 1 && (
            <Box
              width="50px"
              height="4px"
              bg={ind < selected ? "primary.main" : "primary.light"}
            />
          )}
        </Fragment>
      ))}
    </FlexBox>
  );
};

export default Stepper;
