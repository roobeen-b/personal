/* eslint-disable react/prop-types */
const Button = ({ onButtonClick, children, className = "" }) => {
  return (
    <button
      className={`border-b-2 border-green-700 pb-1 mt-2 w-fit ${className}`}
      onClick={onButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
