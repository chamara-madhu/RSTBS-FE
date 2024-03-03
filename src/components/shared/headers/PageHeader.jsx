import React from "react";
import { ArrowLeft } from "feather-icons-react";
import { useNavigate } from "react-router-dom";

const PageHeader = ({ title, showBack }) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-[72px] bg-white z-10 border-b mb-6">
      <div className="flex items-center gap-3 mt-8 mb-3">
        {showBack && (
          <ArrowLeft
            size={20}
            color="#667085"
            className="cursor-pointer hover:text-pp-gray-900"
            onClick={() => navigate(-1)}
          />
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default PageHeader;
