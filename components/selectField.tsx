import React from "react";

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  value,
  onChange,
}) => (
  <div className="w-full md:w-1/2">
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full p-2 border text-black border-gray-300 rounded-md"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
