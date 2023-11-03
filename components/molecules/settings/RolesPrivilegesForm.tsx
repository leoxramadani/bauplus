import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RolesPrivilegesForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Company settings</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Thor Industries" className="w-96" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Email <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="info@thorindustriesmk.com"
              className="w-96"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Phone <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="+38970000000" className="w-96" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>
              Company Website <span className="text-red-500">*</span>
            </Label>
            <Input
              placeholder="www.thorindustries.mk"
              className="w-96"
            />
          </div>
        </div>
        <Button className="flex flex-row items-center justify-center gap-1">
          Save
        </Button>
      </div>
    </div>
  );
};

export default RolesPrivilegesForm;
