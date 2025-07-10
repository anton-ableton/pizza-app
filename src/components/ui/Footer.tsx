import { Link } from "react-router-dom";
import ShiftPizzaLogo from "./ShiftPizzaLogo";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-36">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <ShiftPizzaLogo />
            </Link>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <Link to="/" className="hover:text-red-500">
              Главная
            </Link>
            <Link to="/" className="hover:text-red-500">
              О нас
            </Link>
            <Link to="/" className="hover:text-red-500">
              Условия использования
            </Link>
            <Link to="/" className="hover:text-red-500">
              Политика конфиденциальности
            </Link>
            <Link to="/" className="hover:text-red-500">
              Контакты
            </Link>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p>
            &copy; {new Date().getFullYear()} ШИФТ PIZZA. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
