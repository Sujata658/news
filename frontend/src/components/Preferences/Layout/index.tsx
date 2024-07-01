import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/components/Home/Dashboard/const";

interface LayoutProps {
  nr: number;
  nc: number;
  ncard: number;
  r: number[];
  c: number[];
  onCategorySelect: (cardNumber: number, category: string) => void;
  isCategorySelected: (category: string) => boolean;
}

const Layout = ({ nr, nc, ncard, r, c, onCategorySelect, isCategorySelected }: LayoutProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(Array.from({ length: ncard }, () => ''));

  const config = {
    display: "grid",
    gridTemplateColumns: `repeat(${nc}, 1fr)`,
    gridTemplateRows: `repeat(${nr}, 1fr)`,
    gap: "10px",
    height: "100%",
  };

  const handleCategoryChange = (cardNumber: number, category: string) => {
    const updatedCategories = [...selectedCategories];
    updatedCategories[cardNumber - 1] = category;
    setSelectedCategories(updatedCategories);
    onCategorySelect(cardNumber, category);
  };

  const getCss = (i: number) => {
    const rowSpan = r[i] || 1;
    const colSpan = c[i] || 1;
    return {
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
      border: `border border-primary`,
    };
  };

  return (
    <div style={config} className="p-8 w-full">
      {Array.from({ length: ncard }).map((_, i) => (
        <Card key={i} style={getCss(i)} className="rounded-[10px] flex justify-center items-center">
          <div>
            <div className="text-center">
              Card {i + 1}
            </div>
            <Select onValueChange={(value) => handleCategoryChange(i + 1, value)}>
              <SelectTrigger className="">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent >
                {categories.map((category, index) => (
                  <SelectItem
                    key={index}
                    value={category.value}
                    disabled={isCategorySelected(category.value)}
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Layout;
