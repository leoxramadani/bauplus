import GoBack from "@/components/ui/GoBack";
import UsersForm from "@/components/users/Form";
import useTranslation from "@/lib/hooks/useTranslation";
import { REGISTER_USER_QUERY } from "@/lib/queries/user";
import { withAuthorization } from "@/lib/withAuthorization";

const AddUser = () => {
  const { t } = useTranslation();

  return (
    <>
      <GoBack href="/users" />
      <h1 className="title">{t("Register new user")}</h1>
      <div className="add-edit-container">
        <UsersForm mutation={REGISTER_USER_QUERY}/>
      </div>
    </>
  );
};

export default withAuthorization(AddUser, "UserRegister");
