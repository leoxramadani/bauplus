import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  estimatesSchema,
  estimatesType,
} from '@/lib/schema/Finance/estimates';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
const clients = [
  { label: 'John Cena', value: 'John Cena' },
  { label: 'avast anivirus', value: 'avagial asdkaslk' },
  { label: 'lavazza espresso', value: 'lëasd spasdo' },
] as const;

const calcTax = [
  { label: 'After Discount', value: 'ad' },
  { label: 'Before Discount', value: 'bd' },
];

const EstimatesCreate = () => {
  const form = useForm<estimatesType>({
    resolver: zodResolver(estimatesSchema),
    defaultValues: {
      estimateNumber: 1,
      // validTill: '',
      currency: '',
      client: '',
      calculateTax: '',
      description: '',
      product: '',
    },
  });

  const onSubmit = useCallback(async (data: estimatesType) => {
    console.log(data);
  }, []);

  const onError = (error: any) => {
    console.log('Please check your input fields!->', error);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">
          Estimates
        </h2>
        <h3 className="text-lg font-normal text-gray-900">
          Add an estimate
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Estimate number */}
            <FormField
              control={form.control}
              name="estimateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Estimate number{' '}
                    {/* <span className="text-red-500">*</span> */}
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Estimate number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validTill"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Valid Till</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() ||
                          date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    Your date of birth is used to calculate your age.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Currency */}
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Currency <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mkd">Mkd (Ден)</SelectItem>
                      <SelectItem value="eur">Euro (€)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="chf">CHF (CHF)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* client */}
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Client <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? clients.find(
                                (client) =>
                                  client.value === field.value
                              )?.label
                            : 'Select client'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search client..." />
                        <CommandEmpty>No client found.</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              value={client.label}
                              key={client.value}
                              onSelect={() => {
                                form.setValue('client', client.value);
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  client.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {client.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the client that will be used in the
                    dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Calculate Tax */}
            <FormField
              control={form.control}
              name="calculateTax"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Calculate tax{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'flex w-full items-center justify-between gap-1',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? calcTax.find(
                                (tax) => tax.value === field.value
                              )?.label
                            : 'Select tax'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search tax..." />
                        <CommandEmpty>No tax found.</CommandEmpty>
                        <CommandGroup>
                          {calcTax.map((tax) => (
                            <CommandItem
                              value={tax.label}
                              key={tax.value}
                              onSelect={() => {
                                form.setValue(
                                  'calculateTax',
                                  tax.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  tax.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {tax.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the tax that will be used in the
                    dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className="relative">
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr />
          <Button
            className="flex w-max flex-none"
            variant="outline"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EstimatesCreate;
