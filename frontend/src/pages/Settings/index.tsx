import EditAccount from '@/components/Settings/Account';
import EditPassword from '@/components/Settings/Password';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const Settings = () => {

  return (
    <div className="flex flex-col h-full w-screen ">
      <div className='bg-background h-full p-8 '>
        <div className='flex justify-center'>
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
        </div>
        <div className='flex items-center justify-center'>

          <Tabs defaultValue="account" className="flex flex-col w-[40vw] ">
            <TabsList className='w-full col-span-1 h-full rounded'>
              <TabsTrigger value="account" className='w-full'>
                Account
              </TabsTrigger>
              <TabsTrigger value="password" className='w-full'>Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className='col-span-4 border border-foreground/20 rounded'><EditAccount /></TabsContent>
            <TabsContent value="password" className='col-span-4 border border-foreground/20 rounded'><EditPassword /></TabsContent>
          </Tabs>
        </div>

      </div>

    </div>

  );
};

export default Settings;
