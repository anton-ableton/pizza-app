import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useTheme } from "../../shared/hooks/useTheme";
import clsx from "clsx";
import { themeColors } from "../../shared/constants";

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const isDark = theme === "dark";
  const colors = themeColors[isDark ? "dark" : "light"];

  return (
    <div className={clsx("flex flex-col min-h-screen", colors.backgroundDarker, colors.textPrimary)}>
      <Header />
      <main className="flex-1 container mx-auto py-6">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
