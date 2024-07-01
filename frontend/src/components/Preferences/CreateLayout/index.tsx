import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PrefInput from "@/components/Preferences/PrefInput";
import { Preferences } from "@/types/preferences";
import { useEffect } from "react";
import Layout from "../Layout";


const preferencesSchema = z.object({
  user: z.string().optional(),
  rows: z.number().min(1),
  columns: z.number().min(1),
  ncards: z.number().min(1),
  rowSpan: z.array(z.number()).min(1),
  colSpan: z.array(z.number()).min(1),
  categories: z.array(z.string()).min(1),
}).refine((data) => data.ncards <= data.rows * data.columns, {
  message: "ncards should be less than or equal to rows * columns",
  path: ["ncards"],
});

interface CreateFormProps {
  onSubmit: (data: Preferences) => void;
}

const CreateForm = ({ onSubmit }: CreateFormProps) => {
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Preferences>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      user: "",
      rows: 1,
      columns: 1,
      ncards: 1,
      rowSpan: [1],
      colSpan: [1],
      categories: [""],
    },
  });

  const watchRows = watch("rows");
  const watchColumns = watch("columns");
  const watchNcards = watch("ncards");
  const watchRowSpan = watch("rowSpan");
  const watchColSpan = watch("colSpan");
  const watchCategories = watch("categories");

  useEffect(() => {
    setValue("categories", Array(watchNcards).fill(''));
  }, [watchNcards, setValue]);

  const handleFormSubmit = (data: Preferences) => {
    console.log("Form data before submit:", data);
    onSubmit(data);
    reset();
  };

  const handleCategorySelect = (cardNumber: number, category: string) => {
    const updatedCategories = [...watchCategories];
    updatedCategories[cardNumber - 1] = category;
    setValue("categories", updatedCategories);
    console.log(`Category selected for card ${cardNumber}: ${category}`);
  };

  const isCategorySelected = (category: string) => {
    return watchCategories.includes(category);
  };

  // console.log("Form state:", watch); 

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="h-[80vh] overflow-y-auto flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-[25vw]">
        <div className="flex gap-4">
          <Controller
            name="rows"
            control={control}
            render={({ field }) => <PrefInput title="Rows" {...field} />}
          />
          <Controller
            name="columns"
            control={control}
            render={({ field }) => <PrefInput title="Columns" {...field} />}
          />
        </div>
        <Controller
          name="ncards"
          control={control}
          render={({ field }) => <PrefInput title="No. of Cards" {...field} />}
        />
        {Array.from({ length: watchNcards }).map((_, index) => (
          <div key={index} className="flex gap-4">
            <div>{index + 1}</div>
            <Controller
              name={`rowSpan.${index}`}
              control={control}
              render={({ field }) => <PrefInput {...field} />}
            />
            <Controller
              name={`colSpan.${index}`}
              control={control}
              render={({ field }) => <PrefInput {...field} />}
            />
          </div>
        ))}
        <Button type="submit">Create Layout</Button>
        {errors.categories && <div className="text-red-500">{errors.categories.message}</div>}
      </div>

      <div className="border min-h-[80vh] w-full">
        <Layout
          nr={watchRows}
          nc={watchColumns}
          ncard={watchNcards}
          r={watchRowSpan}
          c={watchColSpan}
          onCategorySelect={handleCategorySelect} 
          isCategorySelected={isCategorySelected} />
      </div>
    </form>
  );
};

export default CreateForm;
