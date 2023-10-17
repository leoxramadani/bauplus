import { useState } from 'react';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { INoticeSchema } from '@/lib/schema/notices/noticeboard';
import Employees from './type/Employees';
import { useMutation } from '@tanstack/react-query';
import {
  CREATE_NOTICE,
  UPDATE_NOTICE,
} from '@/lib/constants/endpoints/notices';
import axios from 'axios';
import EditNotice from './type/EditNotice';

export interface INoticeCreate {
  setModal(open: boolean): void;
}

const NoticeCreate = ({ setModal }: INoticeCreate) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noticeType, setNoticeType] =
    useState<'Employees'>('Employees');

  const { mutate: create } = useMutation({
    mutationFn: (data: INoticeSchema) =>
      axios.post(CREATE_NOTICE, data),
  });

  const { mutate: update } = useMutation({
    mutationFn: (data: INoticeSchema) =>
      axios.post(UPDATE_NOTICE, data),
  });

  const onSubmitNotice = async (data: INoticeSchema) => {
    console.log('noticeId', data.noticeId);
    if (data.noticeId) {
      update(data);
    } else create(data);
  };

  const initialData = {
    noticeTitle: 'Initial Title',
  };

  console.log('onSubmitNotice', onSubmitNotice);

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
      {isEditing ? (
        // Render the edit modal here
        <EditNotice
          // Pass the necessary props for editing
          setModal={setModal}
          onSubmit={onSubmitNotice}
          initialData={initialData}
          // You may need to pass additional props specific to editing
        />
      ) : noticeType === 'Employees' ? (
        // Render the create modal for 'Employees'
        <Employees setModal={setModal} onSubmit={onSubmitNotice} />
      ) : (
        // Render a message for other target audience types
        <p>
          For other target audience types, you can customize here.
        </p>
      )}
    </div>
  );
};
export default NoticeCreate;
