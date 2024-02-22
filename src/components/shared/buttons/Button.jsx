import { forwardRef, useMemo } from "react";
import classnames from "classnames";
import { ClipLoader } from "react-spinners";

const Button = forwardRef(function ButtonComponent(
  {
    id,
    children,
    className,
    variant,
    isLoading,
    handleButton,
    type = "button",
    cusStyle = {},
  },
  ref
) {
  const variantClass = useMemo(() => {
    switch (variant) {
      case "light":
        return `
              outline-none bg-white shadow-xs border border-black text-black text-sm font-medium
              hover:border-black hover:bg-pp-gray-50 hover:text-pp-gray-800
              focus:border-black focus:bg-white focus:text-black
              disabled:border-pp-gray-200 disabled:bg-white disabled:text-black
            `;
      case "primary":
        return `
            border text-white text-sm font-semibold shadow-xs bg-pp-primary-600 border-pp-primary-600
            hover:border-pp-primary-700 hover:bg-pp-primary-700
            focus:border-pp-primary-600 focus:bg-pp-primary-600 focus:shadow-sm-focused-primary-100
            disabled:border-pp-primary-200 disabled:bg-pp-primary-200
            `;
      case "dark":
        return "bg-black text-white text-sm font-medium";
      default:
        return "bg-[#D92D20] text-white text-sm font-medium rounded-lg";
    }
  }, [variant]);

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      className={classnames(
        "flex justify-center rounded-full relative px-5 items-center gap-1 h-10",
        variantClass,
        className
      )}
      onClick={handleButton}
      style={cusStyle}
      disabled={isLoading}
    >
      {isLoading ? (
        <ClipLoader
          color={"#fff"}
          loading={true}
          size={16}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = "Button"; // Add this line

export default Button;
