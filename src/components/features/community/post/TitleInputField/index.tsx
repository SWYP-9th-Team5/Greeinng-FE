import React from 'react';

import { cn } from '@/utils/cn';

interface TitleInputFieldProps {
  label?: string;
  name: string;
  value: string;
  placeholder: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TitleInputField({
  label,
  name,
  value,
  placeholder,
  onChange,
  ...props
}: TitleInputFieldProps) {
  return (
    <fieldset
      className="flex flex-col gap-[0.25rem] md:gap-[0.5rem]"
      {...props}
    >
      {label && (
        <>
          <legend className="sr-only">{label} 작성하기</legend>
          <label className="title2 text-[#333]" htmlFor={'title-input'}>
            {label}
          </label>
        </>
      )}
      <input
        type="text"
        className={cn(
          'font-HappinessR h-[2.75rem] rounded-[0.625rem] border border-[#ddd] bg-[#fff] px-[0.75rem] py-[0.81rem] text-[0.875rem] placeholder-[#ccc]',
          'md:h-[3rem] md:px-[1rem] md:text-[1rem]',
        )}
        id="title-input"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </fieldset>
  );
}
