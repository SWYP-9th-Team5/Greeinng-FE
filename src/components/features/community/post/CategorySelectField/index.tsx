import React from 'react';

import SelectBox from '@components/common/SelectBox';

interface CategorySelectFieldProps {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  data: Array<{ label: string; value: string }>;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function CategorySelectField({
  name,
  label,
  value,
  placeholder,
  data,
  onChange,
}: CategorySelectFieldProps) {
  return (
    <fieldset className="flex flex-col gap-[0.25rem] md:gap-[0.5rem]">
      <legend className="sr-only">{name} 작성하기</legend>
      <label className="title2 text-[#333]" id="category">
        {label}
      </label>
      <SelectBox
        name={name}
        aria-labelledby={name}
        placeholder={placeholder}
        data={data}
        value={value}
        onChange={onChange}
      />
    </fieldset>
  );
}
