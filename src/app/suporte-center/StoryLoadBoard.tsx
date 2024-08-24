import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { H2 } from "@component/Typography";

const StoryLoadBoard = () => {
  return (
    <>
      <H2 textAlign="center" mt="2rem" mb="3rem">
        Estamos preparando tudo pra você! Só um instante.
      </H2>
      <FlexBox justifyContent="center">
        <Icon size="320px">story-set/Design-stats-amico</Icon>
      </FlexBox>
    </>
  );
};

export default StoryLoadBoard;
