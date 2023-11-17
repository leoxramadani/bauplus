import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import Modal from './Modal';

interface IDelete {
  handleDelete: (id: string) => void;
  id: string;
  deleting: boolean;
}

const Delete = ({ handleDelete, deleting, id }: IDelete) => {
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <label
        htmlFor="terms1"
        className="flex cursor-pointer flex-row items-center justify-start gap-2 bg-slate-100 p-3 text-sm font-medium leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
      >
        <Checkbox
          id="terms1"
          onCheckedChange={() => setConfirm(!confirm)}
        />
        I agree that I want to delete this.
      </label>

      <div className="flex flex-row gap-2 self-end">
        <Modal.Close asChild>
          <Button
            variant="destructive"
            className="w-max"
            onClick={() => handleDelete(id)}
            disabled={deleting || confirm == false}
            loading={deleting}
          >
            Delete
          </Button>
        </Modal.Close>
        <Modal.Close asChild>
          <Button variant="outline" className="w-max">
            Close
          </Button>
        </Modal.Close>
      </div>
    </div>
  );
};

export default Delete;
