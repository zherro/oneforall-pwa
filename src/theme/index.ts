import { usePathname } from "next/navigation";
import getThemeOptions from "./themeOptions";

export default function theme(themeName: string) {
  const pathname: any = usePathname();
  const theme = getThemeOptions({ theme: themeName || "DEFAULT" }, pathname);
  return theme;
}
