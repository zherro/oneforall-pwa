import Box from "@component/Box";
import Divider from "@component/Divider";
import { H2 } from "@component/Typography";
import Icon from "@component/icon/Icon";

interface Props {
  icon?: string;
  title: string;
}

const HeaderPageDashBoard = (props) => {
  const { icon, title }: Props = props;
  return (
    <>
      {icon && (
        <Box style={{ float: "left" }}>
          <Icon size="2rem" mt="1rem" mr="0.5rem" color="primary">
            {icon}
          </Icon>
        </Box>
      )}
      <H2 float="left" mt="0.75rem">
        {title}
      </H2>
      <Divider width="100%" bg="gray.400" mt="0.5rem" />
    </>
  );
};

export default HeaderPageDashBoard;
