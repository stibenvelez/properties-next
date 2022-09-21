const ButtonSubmit = ({to}:any) => {
  return (
      <button
          
          type="button"
          className="flex items-center justify-center w-full bg-indigo-600 rounded-full h-14 md:h-16 md:w-16 hover:bg-primary-700 text-neutral-50 focus:outline-none"
      >
          <span className="mr-3 md:hidden">Buscar</span>
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
              <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
          </svg>
      </button>
  );
};

export default ButtonSubmit;
