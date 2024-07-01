import Dashboard from "@/components/Home/Dashboard";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Preferences } from "@/types/preferences";
import getPreferences from "@/apis/preferences/getPreferences";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CreateForm from "@/components/Preferences/CreateLayout";

const Pref = () => {
  const [preferences, setPreferences] = useState<Preferences[] | null>(null);

  useEffect(() => {
    getPreferences()
      .then((res) => {
        setPreferences(res.length === 0 ? null : res);
      })
      .catch((err) => {
        console.error("Error fetching preferences:", err);
      });
  }, []);

  const handleCreateLayout = (data: Preferences) => {
    console.log('Received data:', data);
    setPreferences((prev) => (prev ? [...prev, data] : [data]));
  };

  return (
    <div className="h-full flex flex-col w-full">
      <div className="h-[10vh] flex items-center justify-between p-4 shadow-lg">
        <div className="text-2xl font-bold">Preferences</div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Layout</Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-[90vw]">
            <DialogHeader>
              <DialogTitle>Create Layout</DialogTitle>
            </DialogHeader>
            <CreateForm onSubmit={handleCreateLayout} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex-grow bg-background shadow-lg p-4 w-full">
        {preferences ? (
          preferences.map((pref, index) => (
            <Dashboard
              key={index}
              nr={pref.rows}
              nc={pref.columns}
              ncard={pref.ncards}
              r={pref.rowSpan}
              c={pref.colSpan}
              categories={pref.categories}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-lg font-semibold mb-4">You don't have any preferences</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pref;
