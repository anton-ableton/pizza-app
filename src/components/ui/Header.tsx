import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useState } from "react";
import { useAppDispatch } from "../../shared/store/store";
import { toggleTheme } from "../../features/theme/themeSlice";
import ShiftPizzaIcon from "./ShiftPizzaLogo";
import cartIcon from "../../assets/cart.svg";
import cartActiveIcon from "../../assets/cartActive.svg";
import cartWhiteIcon from "../../assets/cartWhite.svg";
import moonIcon from "../../assets/moon.svg";
import sunIcon from "../../assets/sun.svg";
import ordersIcon from "../../assets/orders.svg";
import ordersActiveIcon from "../../assets/ordersActive.svg";
import ordersWhiteIcon from "../../assets/ordersWhite.svg";
import profileIcon from "../../assets/profile.svg";
import profileActiveIcon from "../../assets/profileActive.svg";
import profileWhiteIcon from "../../assets/profileWhite.svg";
import signInIcon from "../../assets/signIn.svg";
import signInWhiteIcon from "../../assets/signInWhite.svg";
import { useTheme } from "../../shared/hooks/useTheme";
import { useSelector } from "react-redux";
import { type RootState } from "../../shared/store/store";

const Header = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const toggleMobileMenu = () => setMobileMenuOpen((open) => !open);

  const navLinks = (
    <>
      {isAuthenticated ? (
        <>
          <Link
            to="/profile"
            className={clsx("flex items-center py-2", {
              "text-[#F4511E]": location.pathname === "/profile",
            })}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={
                location.pathname === "/profile"
                  ? profileActiveIcon
                  : theme === "dark"
                  ? profileWhiteIcon
                  : profileIcon
              }
              alt="Profile"
              className="h-[16px] w-[16px] mr-2"
            />
            <span className="text-s">Профиль</span>
          </Link>

          <Link
            to="/orders"
            className={clsx("flex items-center py-2", {
              "text-[#F4511E]": location.pathname === "/orders",
            })}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={
                location.pathname === "/orders"
                  ? ordersActiveIcon
                  : theme === "dark"
                  ? ordersWhiteIcon
                  : ordersIcon
              }
              alt="Orders"
              className="h-[16px] w-[16px] mr-2"
            />
            <span className="text-s">Заказы</span>
          </Link>

          <Link
            to="/cart"
            className={clsx("flex items-center  py-2", {
              "text-[#F4511E]": location.pathname === "/cart",
            })}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={
                location.pathname === "/cart"
                  ? cartActiveIcon
                  : theme === "dark"
                  ? cartWhiteIcon
                  : cartIcon
              }
              alt="Cart"
              className="h-[16px] w-[16px] mr-2"
            />
            <span className="text-s">Корзина</span>
          </Link>
        </>
      ) : (
        <Link
          to="/auth"
          className="flex items-center py-2"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img
            src={theme === "light" ? signInIcon : signInWhiteIcon}
            alt="Sign In"
            className="h-[16px] w-[16px] mr-2"
          />
          <span className="text-s">Войти</span>
        </Link>
      )}

      <button
        onClick={() => {
          dispatch(toggleTheme());
          setMobileMenuOpen(false);
        }}
        className="flex items-center py-2 bg-transparent border-none cursor-pointer"
        aria-label="Toggle Theme"
      >
        <img
          src={theme === "dark" ? sunIcon : moonIcon}
          alt="Theme"
          className="h-[16px] w-[16px] mr-2"
        />
      </button>
    </>
  );

  return (
    <header className="border-b border-[#CED2DA]">
      <div
        className="mx-auto py-4 flex items-center justify-between px-4"
        style={{ maxWidth: "960px", width: "100%" }}
      >
        <ShiftPizzaIcon />

        <nav className="hidden md:flex items-center space-x-6">{navLinks}</nav>

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="h-6 w-6 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-[#CED2DA]">
          <div className="flex flex-col p-2 items-center">{navLinks}</div>
        </nav>
      )}
    </header>
  );
};

export default Header;
