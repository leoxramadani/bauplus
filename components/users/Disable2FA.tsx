import {
  DISABLE_2FA_QUERY,
  GET_SPECIFIC_USER_QUERY,
} from '@/lib/queries/user';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import Modal from '../Modal';

const Disable2FA = () => {
  const [password, setPassword] = useState<string>('');
  const { data: session } = useSession();

  const [disable, { loading: loadingDisable }] =
    useMutation(DISABLE_2FA_QUERY);

  const { refetch } = useQuery(GET_SPECIFIC_USER_QUERY);

  const disable2fa = async () => {
    const res = await disable({
      variables: {
        password: password,
      },
    }).then((data) => {
      if (data.data.disableTwoFactor.status === 200) {
        toast.success(
          'Two-factor authentication disabled for your account.'
        );
        refetch({ username: session?.user.username });
      } else {
        toast.error(
          "Couldn't disable two-factor authentication. " +
            data.data.disableTwoFactor.message
        );
      }
    });
  };

  return (
    <Modal value="Disable" className="button red">
      <h1 className="title my-6 text-center">
        Disable two-factor authentication for your account
      </h1>
      <div className="mx-auto flex max-w-xl">
        <div className="flex w-full flex-col gap-1">
          <label htmlFor="password">
            Please type in your password to continue
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mt-6 flex justify-center">
            <Button
              isProgress={loadingDisable}
              className="button red"
              onClick={disable2fa}
              disabled={password.length < 8}
            >
              Disable
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Disable2FA;
