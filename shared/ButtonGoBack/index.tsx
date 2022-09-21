import { useRouter } from 'next/router';
import React from 'react'

const ButtonGoBack = () => {
    const router = useRouter()
  return (
      <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white py-1 px-4 rounded hover:bg-gray-400 focus:outline-none transition duration-200 ease-in-out"
      >
          Volver
      </button>
  );
}

export default ButtonGoBack