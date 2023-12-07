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
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import UserNav from '../atoms/User';
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
  isWindowSmall?: boolean;
  expanded?: boolean;
}

const Topbar: React.FC<TopbarProps> = ({
  showForm,
  isWindowSmall,
  expanded,
}) => {
  const { data: session, status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankAccount, setBankAccount] = useState<any>();
  const [userPopoverOpen, setUserPopover] = useState(false);

  const form = useForm<IProject>({
    resolver: zodResolver(createBankAccountSchema),
    values: { ...bankAccount },
  });

  return (
    <>
      <div className="z-50 flex w-full items-center justify-end self-end py-2">
        {showForm && (
          <div className="flex flex-grow items-center gap-4">
            <Form {...form}>
              <form className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-4">
                  <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem>
                        <div className="w-[200px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value || '1'}
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
                        </div>
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
        )}
        <div className="flex flex-none items-center justify-end gap-10">
          {!isWindowSmall && status === 'authenticated' ? (
            <>
              <UserNav data={session.user} />
            </>
          ) : (
            <div className="flex h-full w-full items-center">
              <Link
                href={'/login'}
                className="flex w-full items-center rounded-lg px-2 py-2 font-semibold text-black transition-all hover:bg-slate-200"
              >
                Login
              </Link>
            </div>
          )}{' '}
        </div>
      </div>
    </>
  );
};

export default Topbar;
