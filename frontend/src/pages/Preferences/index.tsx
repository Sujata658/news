import { Config } from "@/types/preferences";
import CreateForm from "@/components/Preferences/CreateLayout";
import { usePreference } from "@/context/prefContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import updateDefault from "@/apis/preferences/updateDefault";
import DashboardSkeleton from "@/components/Home/Dashboard/Skeleton";
import {  IoTrashOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import CorrectedForm from "@/components/Preferences/CreateLayout/corrected";

const Pref = () => {
  const { availablePrefs, setAvailablePrefs } = usePreference();
  const [selectedLayout, setSelectedLayout] = useState<Config | null>(null);

  // console.log('Available preferences:', availablePrefs);

  const handleCreatedPref = (data: Config) => {
    setAvailablePrefs([...availablePrefs, data]);
  };

  const handleSelection = (layout: Config) => {
    setSelectedLayout(layout);
  };

  const handleMarkDefault = async () => {
    if (selectedLayout) {
      const response = await updateDefault(selectedLayout._id);
      if (response) {
        const updatedPrefs = availablePrefs.map(pref =>
          pref._id === selectedLayout._id ? { ...pref, isDefault: true } : { ...pref, isDefault: false }
        );
        setAvailablePrefs(updatedPrefs);
        toast.success("Layout marked as default");
        setSelectedLayout(null);
      } else {
        toast.error("Failed to mark layout as default");
      }
    }
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="h-[10vh] flex items-center justify-between p-4 shadow-lg">
        <div className="text-2xl font-bold">Preferences</div>
        <CreateForm submited={handleCreatedPref} />
        {/* <CorrectedForm submited={handleCreatedPref} /> */}
      </div>
      <div className="flex-grow bg-background shadow-lg p-4 md:p-8">
        {availablePrefs.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 border p-2 md:px-6 lg:py-8">
            {availablePrefs.map((pref, index) => (
              <div key={index} className="flex flex-col">
                <div className="w-full flex justify-end mb-2">
                  {/* <Button
                    className="rounded-full bg-transparent text-primary hover:text-secondary p-2"
                    onClick={() => handleSelection(pref)}
                  >
                    <FaEdit />
                  </Button> */}
                  {/* <Button
                    className="rounded-full bg-transparent text-primary hover:text-secondary p-2"
                    onClick={() => handleSelection(pref)}
                  >
                    <IoTrashOutline />
                  </Button> */}
                </div>

                <div
                  className="relative p-4 bg-muted border border-primary hover:bg-primary/20 shadow-xl rounded-lg h-[40vh] cursor-pointer transition-all"
                  onClick={() => handleSelection(pref)}
                >
                  <DashboardSkeleton preference={pref} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-lg font-semibold mb-4">You don't have any preferences</div>
            <CreateForm submited={handleCreatedPref} />
            {/* <CorrectedForm submited={handleCreatedPref} /> */}
          </div>
        )}
      </div>
      {selectedLayout && (
        <div className="fixed bottom-4 flex gap-4 items-center justify-center w-full">
          <Button onClick={handleMarkDefault} className="rounded-full">
            Mark this layout as default?
          </Button>
          <Button onClick={() => setSelectedLayout(null)} className="rounded-full">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pref;
