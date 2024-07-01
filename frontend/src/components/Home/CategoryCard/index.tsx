import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  style: any;
  category: string;
}

const CategoryCard = ({style, category}: CategoryCardProps ) => {
  return (
    <Card style={style} className="rounded-[10px]">
      <Badge>{category}</Badge>
      {/* <Badge>Category</Badge>      */}
    </Card>
  )
}

export default CategoryCard