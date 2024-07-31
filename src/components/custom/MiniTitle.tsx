import Typography from "@component/Typography";

const MiniTtile = ({...props} : any) => {
    return <Typography
      fontWeight="600"
      color="gray.800"
      {...props}
    >{props.children}</Typography>;
}


export default MiniTtile;
