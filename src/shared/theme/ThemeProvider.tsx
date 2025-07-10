import { useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.value);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
