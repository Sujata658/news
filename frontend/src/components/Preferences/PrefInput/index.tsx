import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface PrefInputProps {
  title?: string;
  value: string | number;
  onChange: (value: string | number) => void;
}

const PrefInput = ({ title, value, onChange }: PrefInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueAsNumber = parseFloat(e.target.value);
    
    onChange(valueAsNumber);
};


  return (
    <div className="flex space-x-2 text-xs md:text-sm items-center">
      {title && <div>{title} :</div>}
      <Input
        type="number"
        className="p-2 rounded-[5px] text-xs"
        value={typeof value === 'string' ? parseInt(value) : value}
        onChange={handleChange}
      />
    </div>
  );
};

export default PrefInput;
