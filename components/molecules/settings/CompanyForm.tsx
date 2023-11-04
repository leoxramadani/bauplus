import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ICompanySettings,
  companySettingsSchema,
} from '@/lib/schema/settings/companysettings';
import { useState } from 'react';

const CompanyForm = () => {
  const [formData, setFormData] = useState<ICompanySettings>({
    companyId: '', // You might want to populate this from an API or some other source
    companyName: '',
    contactEmail: '',
    contactPhone: 0,
    website: '',
  });

  // Create a function to handle form input changes
  const handleInputChange = (key: any, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    // Validate the form data using the Zod schema
    const result = companySettingsSchema.safeParse(formData);

    if (result.success) {
      // Data is valid; you can proceed to save or send it
      console.log('Form data is valid:', formData);
    } else {
      // Data is invalid; handle the validation errors
      console.error('Form data is invalid:', result.error);
    }
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-8 bg-white">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Company settings</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="Thor Industries"
              className="w-96"
              value={formData.companyName}
              onChange={(e) =>
                handleInputChange('companyName', e.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Email <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="info@thorindustriesmk.com"
              className="w-96"
              value={formData.contactEmail}
              onChange={(e) =>
                handleInputChange('companyEmail', e.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Phone <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="+38970000000"
              className="w-96"
              onChange={(e) =>
                handleInputChange('companyPhone', e.target.value)
              }
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Website <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="www.thorindustries.mk"
              className="w-96"
              value={formData.website}
              onChange={(e) =>
                handleInputChange('companyWebsite', e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <Button
            className="flex flex-row items-center justify-center gap-1"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;
