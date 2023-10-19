import { Button } from '@/components/ui/button';
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
  expensesSchema,
  expensesType,
} from '@/lib/schema/Finance/expenses';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

const ExpensesCreate = () => {
  const employees = [
    { label: 'Ardrin Rexhepi', value: 'ar' },
    { label: 'John Cena', value: 'jc' },
    { label: 'Khabib Nurmagomedov', value: 'kn' },
    { label: 'Lionel Messi', value: 'lm' },
    { label: 'Cristiano Ronaldo', value: 'cr' },
  ] as const;

  const projects = [{ label: 'Arkiva', value: 'arkiva' }] as const;
  const expenseCategories = [
    { label: 'Arkiva', value: 'arkiva' },
  ] as const;
  const bankAccounts = [
    { label: 'Stopanska banka', value: 'STB' },
    { label: 'Komercialna banka', value: 'kom' },
    { label: 'American Invest Bank', value: 'amr' },
  ] as const;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   control
  // }=useForm<estimatesType>({
  //   resolver:zodResolver(estimatesSchema)
  // })

  const form = useForm<expensesType>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      itemName: '',
      currency: 'mkd',
      // exchangeRate: 1,
      // price: 1,
      purchaseDate: '',
      employee: '',
      project: '',
      expenseCategory: '',
      purchasedFrom: '',
      bankAccount: '',
      description: '',
    },
  });

  const onSubmit = useCallback(async (data: expensesType) => {
    console.log(data);
  }, []);

  const onError = (error: any) => {
    console.log('Please check your input fields!->', error);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <h2 className="text-3xl font-bold text-blue-500">Expenses</h2>
        <h3 className="text-lg font-normal text-gray-900">
          Add an expense
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            {/* Item name */}
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Item Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Item Name" {...field} />
                  </FormControl>
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

            {/* exchange rate */}
            <FormField
              control={form.control}
              name="exchangeRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Exchange Rate{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      type="number"
                      placeholder="Exchange Rate"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* purchase date */}
            <FormField
              control={form.control}
              name="purchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Purchase Date{' '}
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Purchase Date" {...field} />
                    {/* <Calendar
          mode="single"
          initialFocus
          {...field}
        /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* employee */}
            <FormField
              control={form.control}
              name="employee"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    Employee <span className="text-red-500">*</span>
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
                            ? employees.find(
                                (employee) =>
                                  employee.value === field.value
                              )?.label
                            : 'Select employee'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search employee..." />
                        <CommandEmpty>
                          No employee found.
                        </CommandEmpty>
                        <CommandGroup>
                          {employees.map((employee) => (
                            <CommandItem
                              value={employee.label}
                              key={employee.value}
                              onSelect={() => {
                                form.setValue(
                                  'employee',
                                  employee.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  employee.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {employee.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the employee that will be used in the
                    dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* project */}
            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Project</FormLabel>
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
                            ? projects.find(
                                (project) =>
                                  project.value === field.value
                              )?.label
                            : 'Select project'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search project..." />
                        <CommandEmpty>No project found.</CommandEmpty>
                        <CommandGroup>
                          {projects.map((project) => (
                            <CommandItem
                              value={project.label}
                              key={project.value}
                              onSelect={() => {
                                form.setValue(
                                  'project',
                                  project.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  project.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {project.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the employee that will be used in the
                    dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* expense category */}
            <FormField
              control={form.control}
              name="expenseCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expense Category</FormLabel>
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
                            ? expenseCategories.find(
                                (expenseCategory) =>
                                  expenseCategory.value ===
                                  field.value
                              )?.label
                            : 'Select category'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search expense categories..." />
                        <CommandEmpty>
                          No expense category found.
                        </CommandEmpty>
                        <CommandGroup>
                          {expenseCategories.map(
                            (expenseCategory) => (
                              <CommandItem
                                value={expenseCategory.label}
                                key={expenseCategory.value}
                                onSelect={() => {
                                  form.setValue(
                                    'expenseCategory',
                                    expenseCategory.value
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    expenseCategory.value ===
                                      field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {expenseCategory.label}
                              </CommandItem>
                            )
                          )}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the employee that will be used in the
                    dashboard.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* purchasedFrom */}
            <FormField
              control={form.control}
              name="purchasedFrom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchased From</FormLabel>
                  <FormControl className="relative">
                    <Input placeholder="Purchased From" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* bank account */}
            <FormField
              control={form.control}
              name="bankAccount"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Bank account</FormLabel>
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
                            ? bankAccounts.find(
                                (bankAccount) =>
                                  bankAccount.value === field.value
                              )?.label
                            : 'Select account'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search bank accounts..." />
                        <CommandEmpty>
                          No bank accounts found.
                        </CommandEmpty>
                        <CommandGroup>
                          {bankAccounts.map((bankAccount) => (
                            <CommandItem
                              value={bankAccount.label}
                              key={bankAccount.value}
                              onSelect={() => {
                                form.setValue(
                                  'bankAccount',
                                  bankAccount.value
                                );
                              }}
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  bankAccount.value === field.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {bankAccount.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  {/* <FormDescription>
                    This is the employee that will be used in the
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

export default ExpensesCreate;
