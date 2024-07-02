import Dashboard from "@/components/Home/Dashboard";
import { Preference } from "@/types/preferences";
import CreateForm from "@/components/Preferences/CreateLayout";
import { usePreference } from "@/context/prefContext";

const Pref = () => {
  
  const { availablePrefs, setAvailablePrefs } = usePreference();



  const handleCreatedPref = (data: Preference) => {
    console.log('Received data:', data);
    setAvailablePrefs([...availablePrefs, data]);
  };
  
  console.log('Available preferences:', availablePrefs)
  return (
    <div className="h-full flex flex-col w-full">
      <div className="h-[10vh] flex items-center justify-between p-4 shadow-lg">
        <div className="text-2xl font-bold">Preferences</div>
        <CreateForm onSubmit={handleCreatedPref} />
      </div>
      <div className="flex-grow bg-background shadow-lg p-4">
        {availablePrefs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4 md:m-8 md:gap-8 cursor-pointer">
          {availablePrefs.map((preff, index) => (
            <div key={index} className="p-4 bg-primary border border-primary hover:bg-primary/90 shadow-xl rounded-[5px] h-[40vh]">
              <Dashboard
                nr={preff.rows}
                nc={preff.columns}
                ncard={preff.ncards}
                r={preff.rowSpan}
                c={preff.colSpan}
                categories={preff.categories}
              />
            </div>
          ))}
        </div>
        
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="text-lg font-semibold mb-4">You don't have any preferences</div>
            <CreateForm onSubmit={handleCreatedPref} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Pref;
