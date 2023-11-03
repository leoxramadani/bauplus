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
import { Bell, ChevronDown, Plus, Settings } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { Separator } from '../ui/separator';

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
      <div className="flex h-full w-max items-center justify-end gap-10 py-2">
        {showForm && (
          <div className="flex w-full">
            <Form {...form}>
              <form className="flex w-max items-center gap-4">
                <div className="flex items-center justify-center gap-4">
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
        )}
        <div className="flex w-full text-black">
          <div className="flex flex-none items-center gap-10 px-4">
            <div className="flex flex-row items-center gap-10">
              {!isWindowSmall && status === 'authenticated' ? (
                <>
                  <div className="flex items-center">
                    <Bell size={22} color="#374957" />
                  </div>
                  <Popover
                    open={userPopoverOpen}
                    onOpenChange={setUserPopover}
                  >
                    <PopoverTrigger asChild>
                      <div className="flex h-full w-full cursor-pointer items-center gap-2 transition-all">
                        <Image
                          src={`https://ui-avatars.com/api/?name=${
                            session.user.firstName.charAt(0) +
                            session.user.lastName.charAt(0)
                          }&background=c7d2fe&color=3730a3&bold=true`}
                          alt=""
                          width={100}
                          height={100}
                          className="mx-auto h-10 w-10 rounded-md"
                        />
                        <ChevronDown size={18} />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent asChild side="top">
                      <div className="relative w-full rounded-xl border-slate-700 !bg-[#141e29] px-0 py-2 text-sm leading-loose text-white">
                        <div
                          className={`
                  flex items-center transition-all ${
                    expanded ? 'ml-3 w-full' : ''
                  }
                `}
                        >
                          <div className="px-4 pt-2">
                            <h1 className="text-base font-semibold">
                              {session.user.firstName}{' '}
                              {session.user.lastName}
                            </h1>
                          </div>
                        </div>
                        <span className="px-4">
                          {session?.user.email}
                        </span>
                        <Separator className="mx-auto my-2 w-[calc(100%-32px)]" />
                        <ul className="my-2 flex flex-col">
                          <li>
                            <Link
                              href={'/account'}
                              onClick={() => setUserPopover(false)}
                              className="flex w-full items-center justify-between px-4 py-1 transition-[color] hover:bg-slate-800"
                            >
                              Settings
                              <Settings size={18} />
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                setUserPopover(!userPopoverOpen);
                                signOut();
                              }}
                              className="flex w-full items-center justify-between px-4 py-1 transition-[color] hover:bg-slate-800"
                            >
                              Log out
                            </button>
                          </li>
                        </ul>
                      </div>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <div className="relative flex h-full w-full items-center justify-center">
                  <Link
                    href={'/login'}
                    className="flex w-full items-center gap-1 rounded-lg px-2 py-2 font-semibold text-black transition-all hover:bg-slate-200"
                  >
                    Login
                  </Link>
                </div>
              )}{' '}
            </div>
          </div>
        </div>
        {/* <div className="flex w-full justify-between">
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
        </div> */}
      </div>
    </>
  );
};

export default Topbar;
