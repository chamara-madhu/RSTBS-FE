import React from "react";
import MainBg from "../../../assets/images/main-bg.webp";

const LoginContent = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex w-1/2 h-[100vh]">
        <img
          src={MainBg}
          alt="main bg"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex w-1/2 h-[100vh]">
        xxx Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        minima, earum, eius magnam hic, fugiat sequi quasi animi accusantium
        quod illo natus vitae excepturi qui accusamus placeat. Dolores, nam
        eveniet.
      </div>
    </div>
  );
};

export default LoginContent;
