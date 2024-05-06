import React, { FC } from "react";
import styles from "@/styles/switcher.module.scss";

const Switcher: FC<{
  isYour: boolean;
  setIsYour: (isYour: boolean) => void;
}> = ({ isYour, setIsYour }) => {
  const handleYour = () => {
    setIsYour(true);
  };

  const handleParticipated = () => {
    setIsYour(false);
  };
  return (
    <div className={"flex justify-center"}>
      <p
        className={`mr-2 cursor-pointer ${isYour && styles.active}`}
        onClick={handleYour}
      >
        Ваши события
      </p>
      <p
        className={`ml-2 cursor-pointer ${!isYour && styles.active}`}
        onClick={handleParticipated}
      >
        Вы подписаны на
      </p>
    </div>
  );
};

export default Switcher;
