import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Config } from "@/types/preferences";
import Layout from "../Layout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import createConfig from "@/apis/config/createConfig";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const preferencesSchema = z.object({
    isDefault: z.boolean(),
    rows: z.number().min(1, { message: "Rows must be at least 1" }),
    columns: z.number().min(1, { message: "Columns must be at least 1" }),
    ncards: z.number().min(1, { message: "Number of cards must be at least 1" }),
    rowSpan: z.array(z.number().min(1, { message: "Rowspan must be at least 1" })).min(1),
    colSpan: z.array(z.number().min(1, { message: "Colspan must be at least 1" })).min(1),
    categories: z.array(z.string().refine((value) => value.length > 0, {
        message: "Please select a category for each card",
    })),
}).refine((data) => data.ncards <= data.rows * data.columns, {
    message: "Number of cards should be less than or equal to rows * columns",
    path: ["ncards"],
});

interface CorrectedProps {
    submited: (data: Config) => void;
}

const CorrectedForm = ({ submited }: CorrectedProps) => {
    const form = useForm<Config>({
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

    function onSubmit(values: z.infer<typeof preferencesSchema>) {
        try {
            createConfig(values as Config).then(() => {
                toast.success("Preferences created successfully");
                submited(values as Config);
                form.reset();
            }).catch(() => {
                toast.error("Failed to create preferences");
            });
        } catch (error) {
            console.error("Error creating preferences:", error);
            toast.error("Error creating preferences");
        }
    }

    const handleCategorySelect = (cardNumber: number, category: string) => {
        const updatedCategories = [...form.watch("categories")];
        updatedCategories[cardNumber - 1] = category;
        form.setValue("categories", updatedCategories);
        console.log("Updated categories:", updatedCategories);
    };

    const isCategorySelected = (category: string) => {
        return form.watch('categories').includes(category);
    };

    const { errors } = form.formState;

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-[80vh]">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-[25vw]">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex gap-4 flex-wrap">
                                        <FormField
                                            control={form.control}
                                            name='rows'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Rows</FormLabel>
                                                    <FormControl>
                                                        <Input type={"number"} placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    {errors.rows && <div>{errors.rows.message}</div>}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='columns'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Columns</FormLabel>
                                                    <FormControl>
                                                        <Input type={"number"} placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    {errors.columns && <div>{errors.columns.message}</div>}
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name='ncards'
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Number of Cards</FormLabel>
                                                    <FormControl>
                                                        <Input type={"number"} placeholder="shadcn" {...field} />
                                                    </FormControl>
                                                    {errors.ncards && <div>{errors.ncards.message}</div>}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row items-center gap-4">
                                        <label className="text-xs md:text-sm">Make this default?</label>
                                        <FormField
                                            control={form.control}
                                            name='isDefault'
                                            render={({ field }) => (
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
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
                                                {Array.from({ length: form.watch('ncards') }).map((_, index) => (
                                                    <tr key={index}>
                                                        <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`rowSpan.${index}`}
                                                                render={({ field }) => (
                                                                    <input
                                                                        type="number"
                                                                        {...field}
                                                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                                                        defaultValue={1}
                                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                                    />
                                                                )}
                                                            />
                                                            
                                                        </td>
                                                        <td className="border border-gray-200 px-4 py-2">
                                                            <FormField
                                                                control={form.control}
                                                                name={`colSpan.${index}`}
                                                                render={({ field }) => (
                                                                    <input
                                                                        type="number"
                                                                        {...field}
                                                                        className="w-full border border-gray-300 rounded-md px-2 py-1"
                                                                        defaultValue={1}
                                                                        onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                                                    />
                                                                )}
                                                            />
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
                                    nr={form.watch("rows")}
                                    nc={form.watch("columns")}
                                    ncard={form.watch("ncards")}
                                    r={form.watch("rowSpan")}
                                    c={form.watch("colSpan")}
                                    onCategorySelect={handleCategorySelect}
                                    isCategorySelected={isCategorySelected}
                                />
                            </div>
                        </div>
                        <Button type="submit" className="w-full">Create Layout</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CorrectedForm;
