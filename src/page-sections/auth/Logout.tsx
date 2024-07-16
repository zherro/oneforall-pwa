import Box from "@component/Box";
import { Button } from "@component/buttons";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

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
      <Button
        mr="auto"
        ml="auto"
        py="16px"
        color="white"
        backgroundColor="error.main"
        onClick={() => handleLogout()}
      >
        Sair
      </Button>
    </Box>
  );
};

export default LogoutButton;
