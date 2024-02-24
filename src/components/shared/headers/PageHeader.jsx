import React from "react";

const PageHeader = ({ title }) => {
  return (
    <div className="sticky top-[72px] bg-white z-10 border-b mb-6">
      <h2 className="mt-8 mb-3 text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default PageHeader;
