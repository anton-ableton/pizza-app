import React from "react";
import pizzaGray from "../../assets/pizzaGray.svg";

const LoadingSpinner: React.FC<{message?: string;}> = ({
  message = "Загрузка...",
}) => {
  return (
    <div className="flex flex-col justify-center items-center py-48">
      <img
        src={pizzaGray}
        alt="Loading"
        className="w-24 h-24 mb-4 animate-pulse"
      />
      <p className="text-gray-400 text-xl font-semibold">
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
