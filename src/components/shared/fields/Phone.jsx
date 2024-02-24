import React, { forwardRef } from "react";
import classnames from "classnames";
import "react-phone-input-2/lib/style.css";

const Phone = forwardRef(
  (
    {
      label,
      value,
      handlePhone,
      labelClass,
      phoneClass,
      className,
      showRequiredLabel = false,
      error,
      info,
    },
    ref
  ) => {
    return (
      <div className={classnames("flex w-full flex-col gap-1.5", className)}>
        <label
          className={classnames(
            "text-sm font-medium text-gray-700",
            labelClass
          )}
        >
          {label} {showRequiredLabel ? "*" : null}
        </label>
        <div
          className={classnames(
            "flex relative outline-none w-full h-11 bg-white border rounded-lg shadow-xs",
            phoneClass,
            error ? "border-red-500" : "border-pp-gray-300"
          )}
        >
          <Phone
            country="lk"
            value={value}
            disableDropdown={true}
            countryCodeEditable={false}
            prefix="+"
            onChange={(phone) => handlePhone(phone)}
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
        {info && <p className="text-xs text-pp-gray-600">{info}</p>}
      </div>
    );
  }
);

Phone.displayName = "Phone";

export default Phone;
