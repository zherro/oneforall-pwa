import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Icon from "@component/icon/Icon";
import { SemiSpan } from "@component/Typography";

const MiniSessionTile = ({
  mt = "0px",
  icon,
  title,
  divider,
}: {
  mt?: string;
  divider: boolean;
  icon: string;
  title: string;
}) => {
  return (
    <>
      <FlexBox mt={mt}>
        {icon && (
          <Icon size="1rem" mt="4px" mr="0.5rem" color="primary">
            {icon}
          </Icon>
        )}
        {title && <SemiSpan>{title}</SemiSpan>}
      </FlexBox>
      {divider && (
        <Divider width="100%" height="1px" bg="gray.400" mb="0.75rem" />
      )}
    </>
  );
};

export default MiniSessionTile;
