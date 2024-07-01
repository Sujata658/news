import Dashboard from "@/components/Home/Dashboard";
import { usePreference } from "@/context/prefContext";

const Home = () => {
  const { preferences } = usePreference();

  return (
    <>
      <div className="h-full">
        {
          preferences && (
            <Dashboard nr={preferences.rows} nc={preferences.columns} ncard={preferences.ncards} r={preferences.rowSpan} c={preferences.colSpan} categories={preferences.categories} />
          )



        }

      </div>
    </>
  );
};

export default Home;
