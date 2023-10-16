import { useState } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { INoticeSchema } from '@/lib/schema/notices/noticeboard';
import Employees from './type/Employees';

export interface INoticeCreate {
  setModal(open: boolean): void;
}

const NoticeCreate = ({ setModal }: INoticeCreate) => {
  const [noticeType, setNoticeType] =
    useState<'Employees'>('Employees');

  const onSubmitNotice = (data: INoticeSchema) => {
    // Implement your form submission logic here
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue={noticeType}
        >
          <div className="flex items-center flex-row gap-1">
            <RadioGroupItem
              className="justify-center items-center"
              value="Employees"
              id="Employees"
              onClick={() => setNoticeType('Employees')}
            />
            <Label htmlFor="Employees">to Employees</Label>
          </div>
        </RadioGroup>
      </div>
      {noticeType === 'Employees' ? (
        <Employees setModal={setModal} onSubmit={onSubmitNotice} />
      ) : (
        <p>
          For other target audience types, you can customize here.
        </p>
      )}
    </div>
  );
};

export default NoticeCreate;
