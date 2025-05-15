import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils/cn';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SelectData = {
  value: string;
  label: string;
};

interface SelectProps extends React.ComponentProps<typeof Select> {
  value?: string;
  data: SelectData[];
  placeholder?: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
}

export default function SelectBox({
  name,
  placeholder,
  data,
  value,
  onChange,
  ...args
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Select
      onOpenChange={setIsOpen}
      onValueChange={(val) => {
        if (onChange && name) {
          onChange({ target: { name, value: val } });
        }
      }}
      value={value}
      {...args}
    >
      <SelectTrigger
        className={cn(
          'font-HappinessR text-[0.875rem] text-[#333]',
          'w-full focus-visible:ring-[#2c6e49]',
          'h-[2.75rem] rounded-[0.625rem] border-[#ddd] bg-[#fff]',
          'md:h-[3rem] md:px-[1rem] md:text-[1rem]',
        )}
      >
        <SelectValue placeholder={placeholder} />
        {isOpen && (
          <ChevronUp className="text-muted-foreground ml-auto h-[0.46] w-[0.75rem] text-[#ccc]" />
        )}
        {!isOpen && (
          <ChevronDown className="text-muted-foreground ml-auto h-[0.46] w-[0.75rem] text-[#ccc]" />
        )}
      </SelectTrigger>
      <SelectContent className="rounded-[0.625rem] border-1 border-[#ddd] bg-[#fff]">
        {data.map((item) => {
          const { value, label } = item;
          return (
            <SelectItem className="body1 text-[#333]" key={value} value={value}>
              {label}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
