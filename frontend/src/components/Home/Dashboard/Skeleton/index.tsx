import { DashboardProps } from ".."

const DashboardSkeleton = ({ preference }: DashboardProps) => {
    const { rows, columns, ncards, rowSpan, colSpan, categories } = preference;

    console.log('Dashboard Props:', { rows, columns, ncards, categories, rowSpan, colSpan });
  
    const config = {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: "5px",
    };
  
    const getCss = (i: number) => {
      const style = {
        gridColumn: `span ${colSpan[i] || 1}`,
        gridRow: `span ${rowSpan[i] || 1}`,
        height: "100%",
        width: "100%",
      };
      console.log(`CSS for card ${i}:`, style);
      return style;
    };
  
    return (
      <div style={config} className="p-2 h-full">
        {Array.from({ length: ncards }).map((_, i) => (
            <div key={i} style={getCss(i)} className="bg-background/20 text-xs  flex items-center justify-center border border-foreground rounded-[5px]">{preference.categories[i].toUpperCase()}</div>
        ))}
      </div>
    );
}

export default DashboardSkeleton