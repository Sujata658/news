import Dashboard from "@/components/Home/Dashboard";
import { usePreference } from "@/context/prefContext";

const Home = () => {
  const { pref } = usePreference();

  return (
    <>
      <div className="max-w-screen h-[90vh]">
        {
          pref && (
            <Dashboard preference={pref} />
          )
        }

      </div>
    </>
  );
};

export default Home;
