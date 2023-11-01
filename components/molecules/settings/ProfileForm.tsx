import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';

const ProfileForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">Profile settings</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>Your Name</Label>
            <Input placeholder="Thor Industries" className="w-96" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>Your Email</Label>
            <Input
              placeholder="info@thorindustriesmk.com"
              className="w-96"
            />
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-2.5">
            <Label>Your Password</Label>
            <Input placeholder="+38970000000" className="w-96" />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>Recieve email notifications?</Label>
            <div className="flex flex-row items-center">
              <RadioGroup defaultValue="Yes">
                <div className="flex flex-row items-center gap-1">
                  <RadioGroupItem
                    className="items-center justify-center"
                    value="Yes"
                    id="Yes"
                  />
                  <Label htmlFor="Yes">Yes</Label>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <RadioGroupItem
                    className="items-center justify-center"
                    value="No"
                    id="No"
                  />
                  <Label htmlFor="No">No</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <Button className="flex flex-row items-center justify-center gap-1">
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProfileForm;
