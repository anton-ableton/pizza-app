import React from "react";
import sadIcon from "../../assets/sad.svg"; // путь подкорректируй, где у тебя лежит иконка

const ErrorCard: React.FC<{ message?: string }> = ({
  message = "Упс, что-то пошло не так, попробуйте ещё раз...",
}) => {
  return (
    <div className="flex flex-col justify-center items-center py-48">
      <div className="flex justify-center mb-4">
        <img
          src={sadIcon}
          alt="Ошибка"
          className="w-24 h-24 object-contain"
          style={{ minWidth: 96, minHeight: 96 }}
        />
      </div>
      <p className="text-gray-400 text-lg font-semibold">{message}</p>
    </div>
  );
};

export default ErrorCard;
