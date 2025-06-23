import React, { useState } from 'react';
// Note: You need to install react-icons first: npm install react-icons
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      <label className="text-[13px] text-slate-800 block mb-2">{label}</label>
      <div className="relative flex items-center border border-gray-300 rounded-md px-3 py-2 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          value={value}
          onChange={onChange}
        />
        {type === 'password' && (
          <button
            type="button"
            className="ml-2 cursor-pointer text-slate-500 hover:text-slate-700"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEyeSlash size={16} />
            ) : (
              <FaRegEye size={16} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

