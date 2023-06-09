"use client"

import React from "react";
import { motion } from "framer-motion";
import { GiReturnArrow } from "react-icons/gi";
import { BsFillTrashFill } from "react-icons/bs";
import { HiX } from "react-icons/hi";
const Button = ({
  text,
  onClick,
  type = "button",
  className,
  theme = "black",
  color,
  isBg = true,
  isPos,
  icon,
  classNameIcon,
  iconPos,
  classNameText,
  isLoading = false,
  pending
}) => {
  const themeColors = {
    black: ["bg-gray-900", "rgb(17 24 39)"],
    green: ["bg-green-500", "rgb(34 197 94)"],

  };

  const boxShadowStyle = `0 0 0 3px white, 0 0 0 6px ${
    color ? color : themeColors[theme][1]
  }`;
  const icons = {
    giReturn: <GiReturnArrow />,
    trash: <BsFillTrashFill />,
    hix: <HiX />,
  };
  return (
    <motion.button
      style={
        isBg
          ? {
              backgroundColor: color,
            }
          : {
              color,
            }
      }
      disabled={pending}
      type={type}
      onClick={onClick}
      className={`${className} ${
        isBg && themeColors[theme][0]
      } text-white py-2 rounded-md  flex-center `}
      whileHover={{
        boxShadow: boxShadowStyle,
        transition: { type: "spring", stiffness: 300, duration: 2 },
      }}
    >
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        <>
          {icon && iconPos == "left" && (
            <div className={classNameIcon}>{icons[icon]}</div>
          )}
          <div className={`${classNameText} flex-center`}>{text}</div>
          {icon && iconPos == "right" && (
            <div className={classNameIcon}>{icons[icon]}</div>
          )}
        </>
      )}
    </motion.button>
  );
};

export default Button;
