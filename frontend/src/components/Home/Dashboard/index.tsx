import React, { useEffect, useState } from "react";
import CategoryCarousel from "../CategoryCarousel";
import { useCategory } from "@/context/catContext";

export interface DashboardProps {
  preference: {
    rows: number;
    columns: number;
    ncards: number;
    rowSpan: number[];
    colSpan: number[];
    categories: string[];
  };
}

const Dashboard = ({ preference }: DashboardProps) => {
  const { rows, columns, ncards, rowSpan, colSpan, categories } = preference;

  const { categories: cats } = useCategory();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsSmallScreen(mediaQuery.matches);

    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const getCss = (i: number): React.CSSProperties => {
    const style: React.CSSProperties = {
      gridColumn: `span ${colSpan[i] || 1}`,
      gridRow: `span ${rowSpan[i] || 1}`,
      borderRadius: "10px",
      border: "1px solid",
      height: isSmallScreen ? "40vh" : "auto",
    };
    return style;
  };

  const gridStyle: React.CSSProperties = isSmallScreen
    ? {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "30px",
        height: "100%",
        overflowY: "scroll",
      }
    : {
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        gap: "30px",
        height: "100%",
        overflowY: "scroll",
      };

  return (
    <div style={gridStyle} className="p-8">
      {Array.from({ length: ncards }).map((_, i) => (
        <div key={i} style={getCss(i)}>
          <CategoryCarousel
            cat={cats.find((c) => c.category === categories[i])}
          />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
