
import { Label } from '@/components/ui/label';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/hr/departments';
import {
  CREATE_NOTICE,
  DELETE_NOTICE,
  GET_SPECIFIC_NOTICE,
  UPDATE_NOTICE,
} from '@/lib/constants/endpoints/notices';
import useData from '@/lib/hooks/useData';
import {
  InoticeSchema,
  noticeSchema,
} from '@/lib/schema/notices/noticeboard';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import NoticeDelete from './NoticeDelete';
import Modal from '@/components/atoms/Modal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const NoticeForm = ({
  setIsModalOpen,
  noticeId,
}: {
  setIsModalOpen: any;
  noticeId?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [noticeData, setNoticeData] = useState<any>();
  const [showConfirmationModal, setShowConfirmationModal] =
    useState(false);

  console.log('asdasdasdasdas', noticeId);

  const form = useForm<InoticeSchema>({
    resolver: zodResolver(noticeSchema),
  });

  const {
    data: departments,
    isLoading,
    isError,
  } = useData<any>(['departments'], GET_ALL_DEPARTMENTS);

  useEffect(() => {
    async function getData(Id: string) {
      try {
        const response = await axios.get(
          GET_SPECIFIC_NOTICE + `?noticeId=${Id}`
        );
        const notice = response.data;
        setNoticeData(notice);

        form.setValue('noticeTitle', notice.noticeTitle);
        form.setValue('departmentId', notice.departmentId);
        form.setValue('noticeText', notice.noticeText);
      } catch (error) {
        console.log('error fetching notice->', error);
      }
    }

    if (noticeId) {
      getData(noticeId);
    }
  }, [noticeId, form]);

  const [noticeType, setNoticeType] =
    useState<'Employees'>('Employees');

  const onSubmitNotice = useCallback(
    async (data: InoticeSchema) => {
      if (noticeId) {
        await axios.put(UPDATE_NOTICE, {
          ...data,
          noticeId,
        });
        toast.success('Successfully updated the notice schema!');
        window.location.reload();
      } else {
        await axios.post(CREATE_NOTICE, {
          ...data,
        });
        toast.success('Successfully created new notice schema!');
        window.location.reload();
      }
      setIsModalOpen(false);
    },
    [noticeId]
  );

  const onError = (error: any) => {
    console.log('Error=>', error);
  };

  console.log('noticeId', noticeId);
  console.log('showConfirmationModal', showConfirmationModal);

  return (
    <div className="flex w-full flex-col gap-4">
      <div>
        <RadioGroup
          className="flex flex-row gap-4"
          defaultValue={noticeType}
        >
          <div className="flex flex-row items-center gap-1">
            <RadioGroupItem
              className="items-center justify-center"
              value="Employees"
              id="Employees"
              onClick={() => setNoticeType('Employees')}
            />
            <Label htmlFor="Employees">to Employees</Label>
          </div>
        </RadioGroup>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitNotice, onError)}
          className="flex w-full flex-col gap-4"
        >
          <div className="grid grid-cols-1 items-center  justify-center gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="noticeTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notice Heading</FormLabel>

                  <FormControl className="relative">
                    <Input
                      placeholder="e.g. New year celebrations at office."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departmentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter department" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {departments ? (
                        <>
                          {departments.map((dep: any) => (
                            <SelectItem
                              key={dep.departmentId}
                              value={dep.departmentId}
                            >
                              {dep.departmentName}
                            </SelectItem>
                          ))}
                        </>
                      ) : (
                        <p>Loading...</p>
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="noticeText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notice Details</FormLabel>

                <FormControl className="relative">
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-4">
            <Button variant="default" className="w-max" type="submit">
              Save
            </Button>
            <Modal open={open} onOpenChange={setOpen}>
              <Modal.Trigger asChild>
                <Button
                  variant="destructive"
                  className="flex gap-1 justify-center items-center"
                >
                  Delete Notice
                </Button>
              </Modal.Trigger>
              <Modal.Content
                title="Delete Notice"
                description="Are you sure you want to delete this notice?"
              >
                <NoticeDelete noticeId={noticeId} />
              </Modal.Content>
            </Modal>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default NoticeForm;
