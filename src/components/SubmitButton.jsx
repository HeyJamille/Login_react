import React, { useState } from 'react';

const SubmitButton = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => { 
    e.preventDefault(); 

    setLoading(true);
    try {
      await onSubmit(e); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-1 h-[40px] w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer relative flex justify-center items-center"
      disabled={loading}
    >
      {loading ? 'Carregando...' : 'Enviar'}
    </button>
  );
};

export default SubmitButton;
