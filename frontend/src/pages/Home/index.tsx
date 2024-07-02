import Dashboard from "@/components/Home/Dashboard";
import { usePreference } from "@/context/prefContext";

const Home = () => {
  const { pref } = usePreference();

  return (
    <>
      <div className="h-full">
        {
          pref && (
            <Dashboard nr={pref.rows} nc={pref.columns} ncard={pref.ncards} r={pref.rowSpan} c={pref.colSpan} categories={pref.categories} />
          )
        }

      </div>
    </>
  );
};

export default Home;
