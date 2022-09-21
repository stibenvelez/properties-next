
const Card = ({children,className, ...res}) => {
  return (
      <div
          className={`bg-white shadow-md rounded-lg overflow-hidden md:p-8 p-2 ${className}`}
      >
          {children}
      </div>
  );
}

export default Card