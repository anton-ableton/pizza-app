import React from "react";

interface CustomButtonProps {
  text: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 bg-[#F4511E] hover:bg-[#D4501E] text-white font-bold py-4 px-4 rounded-2xl cursor-pointer"
    >
      {text}
    </button>
  );
};

export default CustomButton;
