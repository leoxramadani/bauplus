import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { GET_SPECIFIC_USER } from '@/lib/constants/endpoints/users';
import useData from '@/lib/hooks/useData';
import useTranslation from '@/lib/hooks/useTranslation';
import { withAuthorization } from '@/lib/withAuthorization';
import { useSession } from 'next-auth/react';

const Settings = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  const { data } = useData<any>(
    ['specific-user'],
    GET_SPECIFIC_USER + `?us=${session?.user.username}`,
    !!session
  );

  console.log(data);
  return (
    <>
      <Tabs defaultValue="account" className="w-full p-0">
        <TabsList className="flex w-full justify-start gap-2">
          <TabsTrigger value="account">
            <span className='group-hover/container:bg-slate-200 group-hover/container:text-black block p-1 px-3 w-full transition-all rounded-md'>General</span>
          </TabsTrigger>
          <TabsTrigger value="password" >
            <span className='group-hover/container:bg-slate-200 group-hover/container:text-black block p-1 px-3 w-full transition-all rounded-md'>My Notifications</span>
          </TabsTrigger>
        </TabsList>
        <Separator className='bg-slate-300' />
        <TabsContent value="account">
          <div>Edit profile</div>
        </TabsContent>
        <TabsContent value="password">
          <div>My Notifications</div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default withAuthorization(Settings);
