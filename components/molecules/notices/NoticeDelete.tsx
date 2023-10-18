import { Form } from '@/components/ui/form';
import { GET_ALL_DEPARTMENTS } from '@/lib/constants/endpoints/department';
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
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import Modal from '@/components/atoms/Modal';

const NoticeDelete = ({ noticeId }: { noticeId?: string }) => {
  const deleteNotice = () => {
    if (noticeId) {
      try {
        axios
          .delete(DELETE_NOTICE + `?noticeId=${noticeId}`)
          .then(() => {
            toast.success('Successfully deleted the notice!');
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error deleting notice', error);
          });
      } catch (error) {
        console.error('Error deleting notice', error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-4">
        <Button
          variant="destructive"
          className="w-max"
          onClick={deleteNotice}
        >
          Delete
        </Button>
        <Modal.Close asChild>
          <Button variant="default" className="w-max">
            Close
          </Button>
        </Modal.Close>
      </div>
    </div>
  );
};
export default NoticeDelete;
