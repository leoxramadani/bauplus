import {
  CREATE_BANK_ACCOUNT,
  GET_ONE_BANKACCOUNT,
  UPDATE_BANK_ACCOUNT,
} from '@/lib/constants/endpoints/finance';
import { ILeaves, leavesSchema } from '@/lib/schema/hr/leaves/leaves';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ICreateLeave {
  setCloseModal(open: boolean): void;
  leaveId?: string;
}

const CreateLeave = ({ setCloseModal, leaveId }: ICreateLeave) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leave, setLeave] = useState<any>();

  useEffect(() => {
    async function getData(id: string) {
      await axios
        .get(GET_ONE_BANKACCOUNT + `?leaveId=${id}`)
        .then((res) => {
          console.log('setting employee data -->', res);
          setLeave(res.data);
        })
        .catch((error) => {
          console.log('error fetching employees->', error);
        });
    }

    if (leaveId) {
      getData(leaveId);
    }
  }, [leaveId]);

  const members = [
    { label: 'Besir Kurtishi ', value: '001' },
    { label: 'Besir Bossi ', value: '002' },
    { label: 'Besir ronaldo Acc3', value: '003' },
    { label: 'Besir Messi Acc4', value: '004' },
    { label: 'Besir leo Acc5', value: '005' },
  ] as const;

  const leaves = [
    { label: 'Casual', value: 'casual' },
    { label: 'Sick', value: 'sick' },
    { label: 'Earned', value: 'earned' },
  ] as const;

  const status = [
    { label: 'Pending', value: 'pending' },
    { label: 'Approved', value: 'approved' },
  ] as const;

  const duration = [
    { label: 'Full day', value: 'full' },
    { label: 'Multiple', value: 'multiple' },
    { label: 'First Half', value: 'fh' },
    { label: 'Second Half', value: 'sh' },
  ];

  const form = useForm<ILeaves>({
    resolver: zodResolver(leavesSchema),
    values: { ...leave },
  });

  // function onSubmit(data: ILeaves) {
  //   console.log(data);
  // }

  const onSubmit = useCallback(
    async (data: ILeaves) => {
      setIsSubmitting(true);
      try {
        // data.leaveId = '145D8D93-7FF7-4A24-A184-AA4E010E7F37';
        console.log('submit:', data);
        if (leave) {
          // Bank account data exists, perform update
          const res = await axios.put(UPDATE_BANK_ACCOUNT, {
            ...data,
            leaveId: leaveId,
          });
          console.log('Update response:', res);
          toast.success('Successfully updated bank account!');
          setIsSubmitting(false);
          setCloseModal(false);
        } else {
          // Bank account data is empty, perform create
          const res = await axios.post(CREATE_BANK_ACCOUNT, {
            ...data,
            companyId: '145D8D93-7FF7-4A24-A184-AA4E010E7F37',
          });
          console.log('Create response:', res);
          toast.success('Successfully created new bank account!');
          setIsSubmitting(false);
          setCloseModal(false);
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('There was an issue! Please try again.');
      }
      setIsSubmitting(false);
    },
    [leave]
  );

  // return (
  //   <div className="z-0 flex w-full flex-col gap-4  ">
  //     <Form {...form}>
  //       <form
  //         onSubmit={form.handleSubmit(onSubmit)}
  //         className="flex flex-col gap-4"
  //       >
  //         <div className="flex flex-col  items-center justify-center  gap-4 sm:grid sm:grid-cols-2">
  //           {/* project */}
  //           <FormField
  //             control={form.control}
  //             name="member"
  //             render={({ field }) => (
  //               <FormItem className="flex w-full flex-col">
  //                 <FormLabel>Choose Member</FormLabel>
  //                 <Popover>
  //                   <PopoverTrigger asChild>
  //                     <FormControl>
  //                       <Button
  //                         variant="outline"
  //                         role="combobox"
  //                         className={cn(
  //                           'flex w-full items-center justify-between gap-1',
  //                           !field.value && 'text-muted-foreground'
  //                         )}
  //                         disabled={isSubmitting}
  //                       >
  //                         {field.value
  //                           ? members.find(
  //                               (member) =>
  //                                 member.value === field.value
  //                             )?.label
  //                           : 'Choose member'}
  //                         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
  //                       </Button>
  //                     </FormControl>
  //                   </PopoverTrigger>
  //                   <PopoverContent className="w-[250px] p-0">
  //                     <Command>
  //                       <CommandInput placeholder="Search language..." />
  //                       <CommandEmpty>No member found.</CommandEmpty>
  //                       <CommandGroup>
  //                         {members.map((member) => (
  //                           <CommandItem
  //                             value={member.label}
  //                             key={member.value}
  //                             onSelect={() => {
  //                               form.setValue('member', member.value);
  //                             }}
  //                           >
  //                             <Check
  //                               className={cn(
  //                                 'mr-2 h-4 w-4 transition-all',
  //                                 member.value === field.value
  //                                   ? 'opacity-100'
  //                                   : 'opacity-0'
  //                               )}
  //                             />
  //                             {member.label}
  //                           </CommandItem>
  //                         ))}
  //                       </CommandGroup>
  //                     </Command>
  //                   </PopoverContent>
  //                 </Popover>

  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="leaveType"
  //             render={({ field }) => (
  //               <FormItem className="w-full">
  //                 <FormLabel>Leave Type</FormLabel>
  //                 <Select
  //                   onValueChange={field.onChange}
  //                   defaultValue={field.value}
  //                   disabled={isSubmitting}
  //                 >
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue placeholder="Select leave type" />
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   <SelectContent>
  //                     {leaves.map((leave) => (
  //                       <SelectItem
  //                         value={leave.value}
  //                         key={leave.value}
  //                       >
  //                         {leave.label}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="status"
  //             render={({ field }) => (
  //               <FormItem className="w-full">
  //                 <FormLabel>Status</FormLabel>
  //                 <Select
  //                   onValueChange={field.onChange}
  //                   defaultValue={field.value}
  //                   disabled={isSubmitting}
  //                 >
  //                   <FormControl>
  //                     <SelectTrigger>
  //                       <SelectValue placeholder="Select status type" />
  //                     </SelectTrigger>
  //                   </FormControl>
  //                   <SelectContent>
  //                     {status.map((status) => (
  //                       <SelectItem
  //                         value={status.value}
  //                         key={status.value}
  //                       >
  //                         {status.label}
  //                       </SelectItem>
  //                     ))}
  //                   </SelectContent>
  //                 </Select>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="duration"
  //             render={({ field }) => (
  //               <FormItem className="flex w-full flex-col justify-start gap-6">
  //                 <FormLabel>Select Duration</FormLabel>
  //                 <FormControl>
  //                   <RadioGroup
  //                     onValueChange={field.onChange}
  //                     defaultValue={field.value}
  //                     className="flex flex-row gap-4"
  //                     disabled={isSubmitting}
  //                   >
  //                     {duration.map((s) => (
  //                       <FormItem
  //                         key={s.value}
  //                         className="flex flex-row items-center gap-2"
  //                       >
  //                         <FormControl>
  //                           <RadioGroupItem value={s.value} />
  //                         </FormControl>
  //                         <FormLabel className="cursor-pointer font-normal">
  //                           {s.label}
  //                         </FormLabel>
  //                       </FormItem>
  //                     ))}
  //                   </RadioGroup>
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <FormField
  //             control={form.control}
  //             name="date"
  //             render={({ field }) => (
  //               <FormItem className="w-full">
  //                 <FormLabel>Date</FormLabel>
  //                 <Popover>
  //                   <PopoverTrigger asChild>
  //                     <FormControl>
  //                       <Button
  //                         variant={'outline'}
  //                         className={cn(
  //                           'flex w-full items-center justify-between text-left font-normal',
  //                           !field.value && 'text-muted-foreground'
  //                         )}
  //                         disabled={isSubmitting}
  //                       >
  //                         {field.value ? (
  //                           format(field.value, 'PPP')
  //                         ) : (
  //                           <span>Pick leave date</span>
  //                         )}
  //                         <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
  //                       </Button>
  //                     </FormControl>
  //                   </PopoverTrigger>
  //                   <PopoverContent
  //                     className="w-auto p-0"
  //                     align="start"
  //                   >
  //                     <Calendar
  //                       mode="single"
  //                       selected={field.value}
  //                       onSelect={field.onChange}
  //                       //   disabled={(date) =>
  //                       //     date < form.getValues('paidOn')
  //                       //   }
  //                       //   initialFocus
  //                     />
  //                   </PopoverContent>
  //                 </Popover>

  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <div></div>

  //           <FormField
  //             control={form.control}
  //             name="reason"
  //             render={({ field }) => (
  //               <FormItem className="w-full sm:col-span-2">
  //                 <FormLabel>Reason for absence</FormLabel>
  //                 <FormControl className="relative">
  //                   <Textarea
  //                     placeholder="Reason for absence..."
  //                     rows={5}
  //                     {...field}
  //                     disabled={isSubmitting}
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />

  //           <Drop
  //             selectedFile={selectedFile}
  //             setSelectedFile={setSelectedFile}
  //           />
  //         </div>

  //         <Button
  //           loading={isSubmitting}
  //           className="w-max"
  //           type="submit"
  //         >
  //           Submit
  //         </Button>
  //       </form>
  //     </Form>
  //   </div>
  // );
};

export default CreateLeave;
