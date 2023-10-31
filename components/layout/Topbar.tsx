import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createBankAccountSchema } from '@/lib/schema/Finance/finance';
import { IProject } from '@/lib/schema/projects/projects';
import user from '@/public/user.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, ChevronDown, Plus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Breadcrumbs from '../ui/breadcrumbs';
import { Button } from '../ui/button';

const projectName = [
  { projectId: '1', projectName: 'All Projects' },
  { projectId: '2', projectName: 'Product Launch' },
  { projectId: '3', projectName: 'Ad Campaign' },
  { projectId: '4', projectName: 'Market Study' },
  { projectId: '5', projectName: 'Client Advisory' },
  { projectId: '6', projectName: 'Financial Analysis' },
  { projectId: '7', projectName: 'ERP Implementation' },
];

interface TopbarProps {
  showForm?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({ showForm }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankAccount, setBankAccount] = useState<any>();

  const form = useForm<IProject>({
    resolver: zodResolver(createBankAccountSchema),
    values: { ...bankAccount },
  });

  return (
    <>
      <div className="mb-2 flex flex-col w-full items-start gap-4 pb-1">
        <div className="flex justify-between w-full">
          <div className="flex w-full flex-grow">
            <Breadcrumbs />
          </div>
          <div className="flex flex-none items-center gap-10 px-4">
            <Bell size={22} color="#374957" />
            <div className="flex flex-row items-center gap-2">
              <Image
                src={user}
                alt="user"
                width={36}
                height={36}
              ></Image>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>
        <div className="flex flex-grow">
          <Form {...form}>
            <form className="flex w-[500px] flex-col gap-4">
              <div className="grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="projectId"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="All Projects" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectName ? (
                            <>
                              {projectName.map((x: any) => {
                                return (
                                  <SelectItem
                                    value={x.projectId}
                                    key={x.projectId}
                                  >
                                    {x.projectName}
                                  </SelectItem>
                                );
                              })}
                            </>
                          ) : (
                            <p>Loading...</p>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button variant="default" className="w-fit">
                  <Plus color="#fff" size={20} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Topbar;
