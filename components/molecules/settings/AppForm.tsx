import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AppForm = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold">App settings</h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 xl:flex-row">
          <div className="flex flex-col gap-4 lg:w-[500px]">
            <div className="flex flex-col gap-2.5">
              <Label>Date Format</Label>
              <Input placeholder="m/d/Y (10/31/2023)" className="" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Time Format</Label>
              <Input
                placeholder="12 Hour(s) (11:09 AM)"
                className=""
              />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Language</Label>
              <Input
                placeholder="English (United States)"
                className=""
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-[500px]">
            <div className="flex flex-col gap-2.5">
              <Label>Default Timezone</Label>
              <Input placeholder="Europe/Skopje" className="" />
            </div>
            <div className="flex flex-col gap-2.5">
              <Label>Default Currency</Label>
              <Input placeholder="€ (EUR)" className="" />
            </div>
          </div>
        </div>
        <div>
          <Button className="flex flex-row items-center justify-center gap-1">
            Save
          </Button>
        </div>
      </div>
    </div>
    // <div className="flex flex-col gap-4 rounded-lg border bg-white p-8">
    //   <div className="flex flex-col">
    //     <h1 className="text-lg font-semibold">App settings</h1>
    //   </div>
    //   <div className="flex flex-col gap-4 lg:flex-row">
    //     <div className="flex flex-row gap-4 lg:w-[500px] lg:flex-col">
    //       <div className="flex flex-col gap-2.5">
    //         <Label>Date Format</Label>
    //         <Input placeholder="m/d/Y (10/31/2023)" className="" />
    //       </div>
    //       <div className="flex flex-col gap-2.5">
    //         <Label>Time Format</Label>
    //         <Input placeholder="12 Hour(s) (11:09 AM)" className="" />
    //       </div>
    //       <div className="flex flex-col gap-2.5">
    //         <Label>Default Timezone</Label>
    //         <Input placeholder="Europe/Skopje" className="" />
    //       </div>
    //     </div>
    //     <div className="flex flex-row gap-4 lg:w-[500px] lg:flex-col">
    //       <div className="flex flex-col gap-2.5">
    //         <Label>Default Currency</Label>
    //         <Input placeholder="€ (EUR)" className="" />
    //       </div>
    //       <div className="flex flex-col gap-2.5">
    //         <Label>Language</Label>
    //         <Input
    //           placeholder="English (United States)"
    //           className=""
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <Button className="flex flex-row items-center justify-center gap-1">
    //       Save
    //     </Button>
    //   </div>
    // </div>
  );
};

export default AppForm;
