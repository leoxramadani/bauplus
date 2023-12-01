import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: any;
  selected: string[];
  form: any;
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
  setProductLineItems: any;
  productLineItems: any;
}

function MultiSelect({
  options,
  selected = [],
  form,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [itemsSelected, setItemsSelected] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  // Function to remove an object from the productLineEntity array
  const removeObjectFromProductLineEntity = (objectToRemove: any) => {
    const currentProductLineEntity = form.getValues(
      'productLineEntity'
    );
    if (Array.isArray(currentProductLineEntity)) {
      const updatedProductLineEntity =
        currentProductLineEntity.filter(
          (item: any) => item.productId !== objectToRemove.productId
        );

      // Set the updated array back to the form field
      form.setValue('productLineEntity', updatedProductLineEntity);
    }
  };

  const addObjectToProductLineEntity = (newObject: any) => {
    const currentProductLineEntity = form.getValues(
      'productLineEntity'
    );

    // Create a new array with the existing objects and the newObject
    const updatedProductLineEntity = [
      ...(Array.isArray(currentProductLineEntity)
        ? currentProductLineEntity
        : []),
      newObject,
    ];

    // Set the updated array back to the form field
    form.setValue('productLineEntity', updatedProductLineEntity);
  };

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between `}
          onClick={() => setOpen(!open)}
        >
          <div className="flex flex-wrap gap-1">
            {Array.isArray(selected) &&
              selected.map((item) => (
                <Badge
                  variant="secondary"
                  key={item}
                  className="mb-1 mr-1"
                  onClick={() => handleUnselect(item)}
                >
                  {item}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              ))}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command className={className}>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {options &&
              options.map((option: any) => (
                <CommandItem
                  key={option.productId}
                  onSelect={() => {
                    onChange(
                      Array.isArray(selected) &&
                        selected.includes(option.productName)
                        ? selected.filter(
                            (item) => item !== option.productName
                          )
                        : [...selected, option.productName]
                    );
                    if (
                      Array.isArray(selected) &&
                      selected.includes(option.productName)
                    ) {
                      onChange(
                        Array.isArray(selected) &&
                          selected.includes(option.productName)
                          ? selected.filter(
                              (item) => item !== option.productName
                            )
                          : [...selected, option.productName]
                      );

                      console.log('INDSIDE IF');
                      addObjectToProductLineEntity({
                        productId: option.productId,
                        quantity: 1,
                      });
                    } else {
                      removeObjectFromProductLineEntity({
                        productId: option.productId,
                        quantity: 1,
                      });
                    }
                    console.log('OOOUUUTTT');

                    setOpen(true);

                    // const se = form.getValues('productLineEntity');

                    // console.log(form.getValues('productLineEntity'));

                    // const updatedProductLineEntity = [
                    //   ...currentProductLineEntity,
                    //   ,
                    //   {
                    //     productId: option.productId,
                    //     quantity: 1,
                    //   },
                    // ];

                    // form.setValue(
                    //   'productLineEntity',
                    //   updatedProductLineEntity
                    // );
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(option.productName)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.productName}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { MultiSelect };
