import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Preference } from "@/types/preferences";
import Layout from "../Layout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import createPreferences from "@/apis/preferences/createPreferences";
import { toast } from "sonner";


const preferencesSchema = z.object({
  type: z.enum(["normal", "default"]),
  rows: z.number().min(1),
  columns: z.number().min(1),
  ncards: z.number().min(1),
  rowSpan: z.array(z.number()).min(1),
  colSpan: z.array(z.number()).min(1),
  categories: z.array(z.string().refine((value) => value.length > 0, {
    message: "Please select a category for each card",
  })),
}).refine((data) => data.ncards <= data.rows * data.columns, {
  message: "ncards should be less than or equal to rows * columns",
  path: ["ncards"],
});

interface CreateFormProps {
  onSubmit: (data: Preference) => void;
}

const CreateForm = ({ onSubmit }: CreateFormProps) => {
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Preference>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      type: "normal",
      rows: 1,
      columns: 1,
      ncards: 1,
      rowSpan: [1],
      colSpan: [1],
      categories: [],
    },
  });

  const watchRows = watch("rows");
  const watchColumns = watch("columns");
  const watchNcards = watch("ncards");
  const watchRowSpan = watch("rowSpan");
  const watchColSpan = watch("colSpan");
  const watchCategories = watch("categories");


  const handleFormSubmit = (data: Preference) => {
    try {
      createPreferences(data).then(() => {
        toast.success("Preferences created successfully");
         onSubmit(data);
    reset();
      }).catch(() => {
        toast.error("Failed to create preferences");
      });
    } catch (error) {
      
    }
   
  };

  const handleCategorySelect = (cardNumber: number, category: string) => {
    const updatedCategories = [...watchCategories];
    updatedCategories[cardNumber - 1] = category;
    setValue("categories", updatedCategories);
    console.log("Updated categories:", updatedCategories);
  };

  const isCategorySelected = (category: string) => {
    return watchCategories.includes(category);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Layout</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Layout</DialogTitle>
          <DialogDescription>Create your custom layout by specifying rows, columns, number of cards, rowspan, and colspan for each card.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="h-[80vh] ">
          <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-[25vw]">
            <div className="flex flex-col space-y-4">
              <div className="flex gap-4 flex-wrap">
                <Controller
                  name="rows"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2 text-xs md:text-sm">
                      <label htmlFor="rows">Rows</label>
                      <input
                        type="number"
                        className="border p-2 w-[50px]"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                      {errors.rows && <div className="text-red-500">{`from rows: ${errors.rows.message}`}</div>}
                    </div>
                  )}
                />

                <Controller
                  name="columns"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2 text-xs md:text-sm">
                      <label htmlFor="columns">Columns</label>
                      <input
                        type="number"
                        className="border p-2 w-[50px]"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                      {errors.columns && <div className="text-red-500">{`from columns: ${errors.columns.message}`}</div>}
                    </div>
                  )}
                />

                <Controller
                  name="ncards"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-row items-center gap-2 text-xs md:text-sm">
                      <label htmlFor="ncards">Number of Cards</label>
                      <input
                        type="number"
                        className="border p-2 w-[50px]"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                      />
                      {errors.ncards && <div className="text-red-500">{`from ncards: ${errors.ncards.message}`}</div>}
                    </div>
                  )}
                />

              </div>
              <div className="border w-full flex-1 overflow-auto">
                <table className="w-full border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border border-gray-200 px-4 py-2">Cards</th>
                      <th className="border border-gray-200 px-4 py-2">Rowspan</th>
                      <th className="border border-gray-200 px-4 py-2">Colspan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: watchNcards }).map((_, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Controller
                            name={`rowSpan.${index}`}
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                className="w-full border border-gray-300 rounded-md px-2 py-1"
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                              />
                            )}
                          />
                          {errors.rowSpan && errors.rowSpan[index] && (
                            <div className="text-red-500">{errors.rowSpan.message}</div>
                          )}
                        </td>
                        <td className="border border-gray-200 px-4 py-2">
                          <Controller
                            name={`colSpan.${index}`}
                            control={control}
                            defaultValue={1}
                            render={({ field }) => (
                              <input
                                type="number"
                                {...field}
                                className="w-full border border-gray-300 rounded-md px-2 py-1"
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                              />
                            )}
                          />
                          {errors.colSpan && errors.colSpan[index] && (
                            <div className="text-red-500">{errors.colSpan.message}</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="w-full h-[80vh]">
            <Layout
              nr={watchRows}
              nc={watchColumns}
              ncard={watchNcards}
              r={watchRowSpan}
              c={watchColSpan}
              onCategorySelect={handleCategorySelect}
              isCategorySelected={isCategorySelected}
            />
          </div>
          {errors.categories && <div className="text-red-500">{errors.categories.message}</div>}
          </div>
         
          <Button type="submit" className="w-full">Create Layout</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
