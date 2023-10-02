import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import GoBack from "@/components/ui/GoBack";
import ChangePassword from "@/components/users/ChangePassword";
import UsersForm from "@/components/users/Form";
import {
  DEACTIVATE_USER_QUERY,
  GET_SPECIFIC_USER_QUERY,
  REACTIVATE_USER_QUERY,
  UPDATE_USER_QUERY,
} from "@/lib/queries/user";
import { withAuthorization } from "@/lib/withAuthorization";
import useTranslation from "@/lib/hooks/useTranslation";
interface IValues {
  user: any;
  companies: any;
}

const UpdateUser = () => {
  const router = useRouter();
  const [values, setValues] = useState<IValues>();
  const [deactivateModal, setDeactivateModal] = useState(false);

  const {
    data,
    loading: dataLoading,
    refetch,
  } = useQuery(GET_SPECIFIC_USER_QUERY, {
    variables: {
      username: router?.query?.id,
    },
  });
  
  const { t } = useTranslation();
  const [deactivate, { loading: deactivateLoading, error: deactivateError }] =
    useMutation(DEACTIVATE_USER_QUERY);

  const [reactivate, { loading: reactivateLoading, error: reactivateError }] =
    useMutation(REACTIVATE_USER_QUERY);

  useEffect(() => {
    if (data) {
      setValues({
        user: data.specificUser.result.user,
        companies: data.specificUser.result.companies,
      });
    }
  }, [data]);

  const submitDeactivate = async () => {
    const res = await deactivate({
      variables: {
        username: router.query.id,
      },
    }).then((data) => {
      if (data.data.deactivateUser.status === 200) {
        toast.success(data.data.deactivateUser.message);
        setDeactivateModal(false);
        refetch({ username: router.query.id });
      } else {
        toast.error(data.data.deactivateUser.message);
      }
    });
  };

  const submitReactivate = async () => {
    const res = await reactivate({
      variables: {
        username: router.query.id,
      },
    }).then((data) => {
      if (data.data.reactivateUser.status === 200) {
        toast.success(data.data.reactivateUser.message);
        setDeactivateModal(false);
        refetch({ username: router.query.id });
        router.push("/users");
      } else {
        toast.error(data.data.reactivateUser.message);
      }
    });
  };

  return (
    <>
      <GoBack href="/users" />
      <div className="add-edit-container">
        <h1 className="title">
          {t("Update user")}: {data?.specificUser.result.user.userName}
        </h1>
        {data && !data.specificUser.result.user.active && (
          <div className="flex">
            <div className="bg-red-200 my-6 rounded-lg p-3 flex items-center gap-1">
              <i className="fi fi-rr-info mr-1 text-sm"></i>
              {t(
                "This user is , they can't currently log in to the system. To reactivate, use the button below."
              )}
            </div>
          </div>
        )}
        {data && (
          <div className="flex gap-3">
            <div>
              <ChangePassword
                username={data?.specificUser.result.user.userName}
              />
            </div>
            <div className="">
              {data.specificUser.result.user.active ? (
                <Modal
                  className="button"
                  value={t("Deactivate")}
                  openModalOutside={deactivateModal}
                  setOpenModalOutside={setDeactivateModal}
                  handleButton={() => setDeactivateModal(false)}
                >
                  {t(
                    "Are you sure you want to deactivate this user, they won't be able to log in to the system?"
                  )}
                  <div className="flex gap-3">
                    <Button
                      isProgress={deactivateLoading}
                      className="button mt-4 red"
                      onClick={submitDeactivate}
                    >
                      {t("Yes, I'm sure.")}
                    </Button>
                  </div>
                </Modal>
              ) : (
                <Button
                  isProgress={reactivateLoading}
                  className="button"
                  onClick={submitReactivate}
                >
                  {t("Reactivate")}
                </Button>
              )}
            </div>
          </div>
        )}

        {values && <UsersForm mutation={UPDATE_USER_QUERY} values={values} refetch={refetch} />}
        {!values && <p>Loading...</p>}
      </div>
    </>
  );
};

export default withAuthorization(UpdateUser, "UserUpdate");
