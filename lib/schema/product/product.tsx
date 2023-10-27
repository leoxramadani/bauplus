import Modal from '@/components/atoms/Modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DELETE_PRODUCT } from '@/lib/constants/endpoints/products/products';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import z from 'zod';
export const productSchema = z.object({
  productId: z.string().optional(),
  productName: z.string(),
  productCategory: z
    .object({
      categoryId: z.string().optional(),
      categoryName: z.string().optional(),
    })
    .optional()
    .nullable(),
  price: z.coerce.number(),
  categoryId: z.string(),
});

export type IProduct = z.infer<typeof productSchema>;

export const productColumnDef: ColumnDef<IProduct>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          // table.toggleAllPageRowsSelected(!!value) //This one only selects the rows of one table
          table.toggleAllRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'productName',
    header: 'Product Name',
  },
  {
    accessorKey: 'productCategory.categoryName',
    header: 'Product category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsColumn item={row.original} />,
  },
];

const ActionsColumn = ({ item }: { item: any }) => {
  const router = useRouter();

  const handleEdit = (id: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    router.push({
      query: {
        ...router.query,
        id: id,
      },
    });
  };

  // const handleDelete = async (id: string) => {
  //   const confirmDelete = window.confirm(
  //     'Are you sure you want to delete this invoice?'
  //   );
  //   if (confirmDelete) {
  //     console.log('Delete row with id:', id);

  //     await axios
  //       .delete(DELETE_PRODUCT + `?productId=${id}`)
  //       .then((res) => {
  //         console.log('response after delete success =>', res);
  //       })
  //       .catch((error) => {
  //         console.log('Response after error:', error);
  //       });
  //   }
  // };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(DELETE_PRODUCT, {
        params: {
          productId: id,
        },
      });
      toast.success('Successfully deleted bank account.');
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 items-center justify-center p-0"
        >
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            navigator.clipboard.writeText(item.productId)
          }
        >
          Copy item id
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleEdit(item.productId)}>
          Edit row
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Modal open={open} onOpenChange={setOpen}>
          <Modal.Trigger asChild>
            <Button
              variant="destructive"
              className="flex items-center justify-center gap-1"
            >
              Delete Client
            </Button>
          </Modal.Trigger>
          <Modal.Content
            title="Delete Client"
            description="Are you sure you want to delete this client?"
            className="w-full max-w-sm"
          >
            <div className="flex flex-row gap-4">
              <Modal.Close asChild>
                <Button
                  variant="destructive"
                  className="w-max"
                  onClick={() => handleDelete(item.productId)}
                >
                  Delete
                </Button>
              </Modal.Close>
              <Modal.Close asChild>
                <Button variant="default" className="w-max">
                  Close
                </Button>
              </Modal.Close>
            </div>
          </Modal.Content>
        </Modal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
