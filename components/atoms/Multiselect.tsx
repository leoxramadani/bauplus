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
import { IproductLineEntity } from '@/lib/schema/Finance/invoice/invoice';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import * as React from 'react';

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: any;
  selected: any;
  form: any;
  onChange: React.Dispatch<React.SetStateAction<IproductLineEntity[]>>;
  className?: string;
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

  const handleUnselect = (productId: string) => {
    onChange(selected.filter((i:any) => i.productId !== productId));
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
                  key={item.productId}
                  className="mb-1 mr-1"
                  onClick={() => handleUnselect(item.productId)}
                >
                  {item.productName}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUnselect(item.productId);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={() => handleUnselect(item.productId)}
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
              options.map((option: IproductLineEntity) => (
                <CommandItem
                  key={option.productId}
                  onSelect={() => {
                    // const selectedProduct = {
                    //   productId: option.productId,
                    //   quantity: 1,
                    //   productName: option.productName,
                    // };
                    onChange(
                      Array.isArray(selected) &&
                        selected.some((item:IproductLineEntity)=>item?.productId === option.productId)
                        ? selected.filter(
                            (item) => item.productId !== option.productId
                          )
                        : [...selected, {
                            productId: option.productId,
                            quantity: 1,
                            productName:option.productName,
                        }]
                    );
                    setOpen(true);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.some((item:IproductLineEntity)=>item?.productId === option.productId)
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
