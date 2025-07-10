// src/components/ui/PizzaPopup.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { type RootState } from "../../shared/store/store";
import { useNavigate } from "react-router-dom";

import CustomButton from "../../components/ui/CustomButton";
import { useTheme } from "../../shared/hooks/useTheme";
import { baseUrl, themeColors } from "../../shared/constants";

interface Ingredient {
  type: string;
  price: number;
  img: string;
}

interface Size {
  type: string;
  price: number;
}

interface PizzaPopupProps {
  pizza: {
    id: string;
    name: string;
    description: string;
    img: string;
    sizes: Size[];
    toppings: Ingredient[];
  };
  onClose: () => void;
}

const PizzaPopup: React.FC<PizzaPopupProps> = ({ pizza, onClose }) => {
  const [selectedSize, setSelectedSize] = useState<string>(pizza.sizes[0]?.type);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const theme = useTheme();
  const isDark = theme === "dark";
  const colors = themeColors[isDark ? "dark" : "light"];

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const navigate = useNavigate();

  const getSizeLabel = (type: string) => {
    switch (type) {
      case "SMALL": return "Маленькая";
      case "MEDIUM": return "Средняя";
      case "LARGE": return "Большая";
      default: return type;
    }
  };

  const getSizeInCm = (type: string) => {
    switch (type) {
      case "SMALL": return 30;
      case "MEDIUM": return 35;
      case "LARGE": return 40;
      default: return 30;
    }
  };

  const sizePrice = pizza.sizes.find(s => s.type === selectedSize)?.price || 0;
  const toppingsPrice = pizza.toppings
    .filter(t => selectedToppings.includes(t.type))
    .reduce((sum, t) => sum + t.price, 0);
  const totalPrice = sizePrice + toppingsPrice;

  const handleToggleTopping = (type: string) => {
    setSelectedToppings(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleAddToCartClick = () => {
    if (!isAuthenticated) {
      navigate("/auth");
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 overflow-y-auto">
      <div className={clsx(
        "w-full max-w-[806px] relative flex flex-col rounded-3xl shadow-xl overflow-hidden",
        colors.background,
        isDark ? "text-white" : "text-black"
      )} style={{ maxHeight: '90vh' }}>

        <button
          className={clsx(
            "absolute right-6 top-6 text-2xl",
            isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-600"
          )}
          onClick={onClose}
        >
          &times;
        </button>

        <div className="flex-1 overflow-y-auto pt-8 px-6 pb-32">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={baseUrl + pizza.img}
              alt={pizza.name}
              className="w-[200px] h-[200px] object-cover"
            />

            <div className="flex-1 w-full">
              <h2 className="text-2xl font-bold mb-2">{pizza.name}</h2>
              <p className={clsx("mb-2 text-sm", colors.lightText)}>
                {getSizeInCm(selectedSize)} см, традиционное тесто
              </p>
              <p className={clsx("mb-6 text-md", colors.lightText)}>{pizza.description}</p>

              <div className="mb-6">
                <div className={clsx(
                  "flex rounded-2xl overflow-hidden w-full max-w-xs border-2",
                  colors.sizeBg,
                  colors.border
                )}>
                  {pizza.sizes.map((size) => (
                    <motion.button
                      key={size.type}
                      onClick={() => setSelectedSize(size.type)}
                      className={clsx(
                        "w-full py-3 text-sm transition-colors rounded-xl",
                        selectedSize === size.type
                          ? clsx(colors.selectedSizeBg)
                          : clsx(
                              isDark ? "hover:text-white" : "hover:text-black",
                              isDark ? "text-gray-400" : "text-gray-500"
                            )
                      )}
                      layout
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {getSizeLabel(size.type)}
                    </motion.button>
                  ))}
                </div>
              </div>

              <h3 className="text-base font-semibold mb-2">Добавить по вкусу</h3>
              <div className={clsx(
                "max-w-[486px] flex space-x-4 overflow-x-auto scrollbar-thin pb-2 pr-2",
                colors.scrollThumb
              )}>
                {pizza.toppings.map((topping) => (
                  <div
                    key={topping.type}
                    onClick={() => handleToggleTopping(topping.type)}
                    className={clsx(
                      "min-w-[100px] rounded-2xl p-2 border cursor-pointer flex flex-col items-center text-center hover:shadow-md",
                      selectedToppings.includes(topping.type)
                        ? clsx("border-[#F4511E]", colors.toppingSelectedBg)
                        : colors.toppingBorder
                    )}
                  >
                    <img
                      src={baseUrl + topping.img}
                      alt={topping.type}
                      className="w-[60px] h-[60px] object-contain mb-1"
                    />
                    <span className="text-xs font-semibold">{topping.type}</span>
                    <span className={clsx("text-sm", colors.lightText)}>{topping.price} ₽</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(
          "absolute bottom-0 left-0 w-full flex items-center justify-end px-6 py-4 gap-4",
          colors.background,
          isDark ? "text-white" : "text-black"
        )}>
          <span className="pt-4 text-xl font-bold whitespace-nowrap">{totalPrice} ₽</span>
          <div className="flex-1 max-w-[200px]">
            <CustomButton text="Добавить в корзину" onClick={handleAddToCartClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaPopup;
