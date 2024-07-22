import Box from "@component/Box";
import { Button } from "@component/buttons";
import Icon from "@component/icon/Icon";
import { logout } from "app/(auth)/actions";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const signout: any = logout;

  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/login"); // redirecione para a página de login ou qualquer outra página
    } else {
      console.error("Failed to logout");
    }
  };
  return (
    <Box minWidth="150px">
      <form>
        <Button
          mr="auto"
          ml="auto"
          py="16px"
          color="white"
          backgroundColor="error.main"
          formAction={signout}
        >
          Sair{" "}
          <Icon size="1rem" ml="0.75rem">
            fa/solid/arrow-right-from-bracket
          </Icon>
        </Button>
      </form>
      ;
    </Box>
  );
};

export default LogoutButton;
