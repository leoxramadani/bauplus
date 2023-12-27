import AppForm from '@/components/molecules/settings/AppForm';
import AttendanceOptionsForm from '@/components/molecules/settings/AttendanceOptionsForm';
import CompanyForm from '@/components/molecules/settings/CompanyForm';
import CurrencyForm from '@/components/molecules/settings/CurrencyForm';
import FinanceForm from '@/components/molecules/settings/FinanceForm';
import ModuleForm from '@/components/molecules/settings/ModuleForm';
import NotificationForm from '@/components/molecules/settings/NotificationForm';
import PayrollForm from '@/components/molecules/settings/PayrollForm';
import ProfileForm from '@/components/molecules/settings/ProfileForm';
import RolesPrivilegesForm from '@/components/molecules/settings/RolesPrivilegesForm';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface SettingComponent {
  [key: string]: React.FC;
}

const Settings = () => {
  return (
    <>
      <div className="">
        <Tabs defaultValue="company" className="w-full p-0">
          <TabsList className="flex w-full justify-start gap-2 overflow-y-hidden">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="app">App</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
            <TabsTrigger value="attendance">
              Attendance options
            </TabsTrigger>
            <TabsTrigger value="roles-privileges">
              Roles & Privileges
            </TabsTrigger>
            <TabsTrigger value="payroll">
              Payroll settings
            </TabsTrigger>
            <TabsTrigger value="module">Module settings</TabsTrigger>
          </TabsList>
          <Separator className="bg-slate-300" />
          <TabsContent value="company">
            <CompanyForm />
          </TabsContent>
          <TabsContent value="app">
            <AppForm />
          </TabsContent>
          <TabsContent value="account">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationForm />
          </TabsContent>
          <TabsContent value="currency">
            <CurrencyForm />
          </TabsContent>
          <TabsContent value="finance">
            <FinanceForm />
          </TabsContent>
          <TabsContent value="attendance">
            <AttendanceOptionsForm />
            {/* <Attend22 /> */}
          </TabsContent>
          <TabsContent value="roles-privileges">
            <RolesPrivilegesForm />
          </TabsContent>
          <TabsContent value="payroll">
            <PayrollForm />
          </TabsContent>
          <TabsContent value="module">
            <ModuleForm />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
