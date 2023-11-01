import Topbar from '@/components/layout/Topbar';
import AppForm from '@/components/molecules/settings/AppForm';
import CompanyForm from '@/components/molecules/settings/CompanyForm';
import CurrencyForm from '@/components/molecules/settings/CurrencyForm';
import FinanceForm from '@/components/molecules/settings/FinanceForm';
import ModuleForm from '@/components/molecules/settings/ModuleForm';
import NotificationForm from '@/components/molecules/settings/NotificationForm';
import PayrollForm from '@/components/molecules/settings/PayrollForm';
import ProfileForm from '@/components/molecules/settings/ProfileForm';
import RolesPrivilegesForm from '@/components/molecules/settings/RolesPrivilegesForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SettingComponent {
  [key: string]: React.FC;
}

const settingComponents: SettingComponent = {
  'Company Settings': CompanyForm,
  'App Settings': AppForm,
  'Profile Settings': ProfileForm,
  'Notification Settings': NotificationForm,
  'Currency Settings': CurrencyForm,
  'Finance Settings': FinanceForm,
  'Roles & Privileges': RolesPrivilegesForm,
  'Payroll Settings': PayrollForm,
  'Module Settings': ModuleForm,
};

const Settings = () => {
  const [selectedSetting, setSelectedSetting] = useState(
    'Company Settings'
  );

  const SelectedComponent = settingComponents[selectedSetting];

  const isCompanySettingsSelected =
    selectedSetting === 'Company Settings';
  const isAppSettingsSelected = selectedSetting === 'App Settings';
  const isProfileSettingsSelected =
    selectedSetting === 'Profile Settings';
  const isNotificationSettingsSelected =
    selectedSetting === 'Notification Settings';
  const isCurrencySettingsSelected =
    selectedSetting === 'Currency Settings';
  const isFinanceSettingsSelected =
    selectedSetting === 'Finance Settings';
  const isRolesPrivilegesSelected =
    selectedSetting === 'Roles & Privileges';
  const isPayrollSettingsSelected =
    selectedSetting === 'Payroll Settings';
  const isModuleSettingsSelected =
    selectedSetting === 'Module Settings';

  return (
    <>
      <Topbar />
      <div className="mt-6 flex flex-col items-center justify-center gap-8 rounded-xl bg-white p-8">
        <div className="flex flex-row gap-4">
          <Button
            variant={
              isCompanySettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Company Settings')}
          >
            Company settings
          </Button>
          <Button
            variant={isAppSettingsSelected ? 'default' : 'outline'}
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('App Settings')}
          >
            App settings
          </Button>
          <Button
            variant={
              isProfileSettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Profile Settings')}
          >
            Profile settings
          </Button>
          <Button
            variant={
              isNotificationSettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() =>
              setSelectedSetting('Notification Settings')
            }
          >
            Notification settings
          </Button>
          <Button
            variant={
              isCurrencySettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Currency Settings')}
          >
            Currency settings
          </Button>
          <Button
            variant={
              isFinanceSettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Finance Settings')}
          >
            Finance settings
          </Button>
          <Button
            variant={
              isRolesPrivilegesSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Roles & Privileges')}
          >
            Roles & Privileges
          </Button>
          <Button
            variant={
              isPayrollSettingsSelected ? 'default' : 'outline'
            }
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Payroll Settings')}
          >
            Payroll settings
          </Button>
          <Button
            variant={isModuleSettingsSelected ? 'default' : 'outline'}
            className="text-md rounded-lg font-medium"
            onClick={() => setSelectedSetting('Module Settings')}
          >
            Module settings
          </Button>
        </div>
        {SelectedComponent && <SelectedComponent />}
      </div>
    </>
  );
};

export default Settings;
