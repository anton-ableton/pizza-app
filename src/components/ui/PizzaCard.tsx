import React from "react";
import CustomButton from "./CustomButton";

interface PizzaCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onClick: () => void;
}

const PizzaCard: React.FC<PizzaCardProps> = ({
  name,
  description,
  price,
  imageUrl,
  onClick,
}) => {
  return (
    <div className="flex flex-col p-4 h-full rounded-4xl" onClick={onClick}>
      <div className="flex justify-center mb-4 flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-48 h-48 object-cover"
          style={{ minWidth: "192px", minHeight: "192px" }}
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="flex-grow">{description}</p>
      <p className="font-sans text-lg font-bold mt-4">{price}</p>
      <CustomButton text={"Выбрать"} />
    </div>
  );
};


export default PizzaCard;
