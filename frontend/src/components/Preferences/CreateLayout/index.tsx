import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Config } from "@/types/preferences";
import Layout from "../Layout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { toast } from "sonner";
import createConfig from "@/apis/config/createConfig";

const preferencesSchema = z.object({
  isDefault: z.boolean(),
  rows: z.number().min(1),
  columns: z.number().min(1),
  ncards: z.number().min(1),
  rowSpan: z.array(z.number()).min(1),
  colSpan: z.array(z.number()).min(1),
  categories: z.array(z.string().min(1, "Please select a category for each card"))
}).refine((data) => data.ncards <= data.rows * data.columns, {
  message: "ncards should be less than or equal to rows * columns",
  path: ["ncards"],
}).refine((data) => data.categories.length <= data.ncards, {
  message: "Please select categories for all cards",
  path: ["categories"],
});

interface CreateFormProps {
  submited: (data: Config) => void;
}

const CreateForm = ({ submited }: CreateFormProps) => {
  const { control, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<Config>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      isDefault: false,
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

  const handleFormSubmit = (data: Config) => {
    if (data.ncards !== data.categories.length) {
      toast.error("Please select a category for each card");
      return;
    }
    try {
      createConfig(data).then(() => {
        toast.success("Preferences created successfully");
        submited(data);
        reset();
      }).catch(() => {
        toast.error("Failed to create preferences");
      });
    } catch (error) {
      console.error("Error creating preferences:", error);
      toast.error("Error creating preferences");
    }
  };

  const handleCategorySelect = (cardNumber: number, category: string) => {
    const updatedCategories = [...watchCategories];
    updatedCategories[cardNumber - 1] = category;
    setValue("categories", updatedCategories, { shouldValidate: true });
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
        <form onSubmit={handleSubmit(handleFormSubmit)} className="h-[80vh]">
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
                <div className="flex flex-row items-center gap-4">
                  <label className="text-xs md:text-sm">Make this default?</label>
                  <Controller
                    name="isDefault"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-row items-center gap-2">
                        <label className="text-xs md:text-sm">
                          <input
                            type="radio"
                            value="true"
                            checked={field.value === true}
                            onChange={() => field.onChange(true)}
                          />
                          Yes
                        </label>
                        <label className="text-xs md:text-sm">
                          <input
                            type="radio"
                            value="false"
                            checked={field.value === false}
                            onChange={() => field.onChange(false)}
                          />
                          No
                        </label>
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
                <div>
                  <label className="text-xs md:text-sm">Select a category for each card</label>
                  <div className="flex flex-wrap gap-4">
                    <Controller
                      name="categories"
                      control={control}
                      render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((category, index) => (
                            <div key={index} className="bg-gray-200 px-2 py-1 rounded-md">
                              {category}
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    {errors.categories && <div className="text-red-500">{errors.categories.message}</div>}

                  </div>
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
          </div>
          <Button type="submit" className="w-full">Create Layout</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
