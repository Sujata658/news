import CategoryCard from "../CategoryCard";

interface DashboardProps {
  nr: number;
  nc: number;
  ncard: number;
  categories: string[];
  r: number[];
  c: number[];
}

const Dashboard = ({ nr, nc, ncard, r, c, categories }: DashboardProps) => {
  const config = {
    display: "grid",
    gridTemplateColumns: `repeat(${nc}, 1fr)`,
    gridTemplateRows: `repeat(${nr}, 1fr)`,
    gap: "10px",
    height: "100%",
  };

  // console.log('Dashboard:', nr, nc, ncard, r, c, categories)


  const getCss = (i: number) => {
    const rowSpan = r[i] || 1;
    const colSpan = c[i] || 1;
    return {
      gridColumn: `span ${colSpan}`,
      gridRow: `span ${rowSpan}`,
    };
  };

  return (
    <div style={config} className="p-8 w-full">
      {Array.from({ length: ncard }).map((_, i) => (
        <CategoryCard key={i} style={getCss(i)} category={categories[i]} />
      ))}
    </div>
  );
};

export default Dashboard;
