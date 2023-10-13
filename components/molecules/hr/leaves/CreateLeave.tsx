import React, { useCallback, useMemo, useState } from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/components/ui/form';
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IPayment, paymentSchema } from '@/lib/schema/Finance/payment';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Check, ChevronsUpDown, X } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ILeaves, leavesSchema } from '@/lib/schema/hr/leaves';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {DropzoneInputProps, FileRejection, useDropzone} from 'react-dropzone';


interface ICreateLeave {
    setCloseModal(open: boolean): void;

}


const baseStyle = {
  flex: 1,
  display: 'flex',
  // flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


const CreateLeave = ({setCloseModal} : ICreateLeave) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        // Take only the first accepted file
        const file = acceptedFiles[0];
        setSelectedFile(file);
      }

      // Handle rejected files if needed
      if (fileRejections.length > 0) {
        console.log('Rejected files:', fileRejections);
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {'image/*':[], 'application/pdf': []},
    multiple: false,
    onDrop // Allow only one file
  });


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);





    const projects = [
        { label: "Thor1", value: "thor" },
        { label: "Thor Website", value: "thorWebsite" },
        { label: "Arkiva", value: "arkiva" },
        { label: "ProWork", value: "prowork" },
        { label: "Miniera", value: "miniera" }
      ] as const
    
      const invoice = [
        { label: "INV#001", value: "001" },
        { label: "INV#002", value: "002" },
        { label: "INV#003", value: "003" },
        { label: "INV#004", value: "004" },
        { label: "INV#005", value: "005" }
      ] as const
    
      const members = [
        { label: "Besir Kurtishi ", value: "001" },
        { label: "Besir Bossi ", value: "002" },
        { label: "Besir ronaldo Acc3", value: "003" },
        { label: "Besir Messi Acc4", value: "004" },
        { label: "Besir leo Acc5", value: "005" }
      ] as const

      const leaves = [
        { label: "Casual", value: "casual" },
        { label: "Sick", value: "sick" },
        { label: "Earned", value: "earned" },
      ] as const

      const bankAccs = [
        { label: "Besir Kurtishi ", value: "001" },
        { label: "Besir Bossi ", value: "002" },
        { label: "Besir ronaldo Acc3", value: "003" },
        { label: "Besir Messi Acc4", value: "004" },
        { label: "Besir leo Acc5", value: "005" }
      ] as const
    
      const currency = [
        { label: "Ден.", value: "mkd" },
        { label: "$USD", value: "usd" },
        { label: "Eur", value: "eur" },
       
      ] as const
    
      const status = [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },       
      ] as const

      const duration = [
        { label: "Full day", value: "full" },
        { label: "Multiple", value: "multiple" },
        { label: "First Half", value: "fh" },
        { label: "Second Half", value: "sh" },

      ]



      const form = useForm<ILeaves>({
        resolver: zodResolver(leavesSchema),
      });
    
  
      function onSubmit(data: ILeaves) {
        console.log(data);
      }


  return (
    <div className="z-0 flex flex-col gap-4 w-full  ">
      {/* <div>
        <h2 className="text-3xl font-bold text-blue-500">
            Add Payment
        </h2>
        <h3 className="font-normal text-lg text-gray-900">
            Payment Details
        </h3>
      </div> */}

      <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className="flex flex-col  sm:grid sm:grid-cols-2  justify-center items-center gap-4">
            {/* project */}
            <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col">
              <FormLabel>Choose Member</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full flex items-center gap-1 justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? members.find(
                            (member) => member.value === field.value
                          )?.label
                        : "Choose member"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No member found.</CommandEmpty>
                    <CommandGroup>
                      {members.map((member) => (
                        <CommandItem
                          value={member.label}
                          key={member.value}
                          onSelect={() => {
                            form.setValue("member", member.value)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4 transition-all",
                              member.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {member.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        

<FormField
          control={form.control}
          name="leaveType"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Leave Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {leaves.map((leave) => (
                                      <SelectItem value={leave.value} key={leave.value}>{leave.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((status) => (
                                      <SelectItem value={status.value} key={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />



    <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-6 justify-start">
              <FormLabel>Select Duration</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row gap-4"
                >
                  {
                    duration.map(s => (
                  <FormItem key={s.value} className="flex flex-row items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={s.value} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {s.label}
                        </FormLabel>
                      </FormItem>
                    ))
                  }
                  
                 
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
  




<FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full flex justify-between items-center text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick leave date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    //   disabled={(date) =>
                    //     date < form.getValues('paidOn')
                    //   }
                    //   initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />

          <div></div>

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className='w-full sm:col-span-2'>
                <FormLabel>Reason for absence</FormLabel>
                <FormControl className="relative">
                  <Textarea placeholder="Reason for absence..." rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

{/* <div {...getRootProps({style})} className=' col-span-2 h-24 items-center flex-col flex justify-center'>
        <input {...getInputProps()} />
        <p>Drag and drop some files here, or click to select files</p>
      </div> */}

{!selectedFile && (
      <div {...getRootProps({style})} className='w-full sm:col-span-2 h-24 items-center flex-col flex justify-center'>
        <input {...getInputProps()} />
        <p>
          {isFocused
            ? isDragAccept
              ? 'Drop the file here'
              : isDragReject
              ? 'File type not accepted, please drop an image or PDF'
              : 'Drag and drop an image '
            : 'Drag and drop an image or click to select a file'}
        </p>
      </div>)}
      {selectedFile && (
selectedFile.type.startsWith('image/') ? (
        <div className='group relative sm:max-w-[200px] sm:max-h-[200px] border border-gray-100 w-full h-full flex justify-center items-center'>
            <img
              className='aspect-[4/3] h-full w-full object-cover'
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
            />
            
            <X className='absolute bg-red-500 text-white shadow-md top-2 right-2 rounded-full p-1 lg:opacity-0 group-hover:opacity-100 transition-all cursor-pointer' onClick={() => setSelectedFile(null)} />
        </div>
      ):
      (
        <div className='flex flex-row gap-2'>
          <p>{selectedFile.name}</p>
          <X className=' bg-red-500 text-white shadow-md top-2 right-2 rounded-full p-1  cursor-pointer' onClick={() => setSelectedFile(null)} />

        </div>
      ))}


  
            </div>

            <Button className="w-max" type="submit">
        Submit
      </Button>
            </form>
      </Form>
    </div>
  )
}

export default CreateLeave