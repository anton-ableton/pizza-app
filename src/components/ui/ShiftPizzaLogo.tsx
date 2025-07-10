import pizzaLogo from "../../assets/pizza.svg";

const ShiftPizzaLogo = () => {
  return (
      <div className="flex items-center">
        <div className="flex flex-col text-sm font-bold text-red-500">
          <p>ШИФТ</p> <p>PIZZA</p>
        </div>
        <img src={pizzaLogo} alt="Logo" className="h-8 w-auto" />
      </div>
  );
};

export default ShiftPizzaLogo;
