import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCompany } from "@/lib/hooks/useCompany";
import { columns } from "@/lib/schemas/user";
import { GET_ALL_USERS_QUERY } from "@/lib/queries/user";

import useTranslation from "@/lib/hooks/useTranslation";
const Users = () => {
  const { t } = useTranslation();
  const { hasPrivilege } = useCompany();

  return (
    <>
      <h1 className="title">{t("Users")}</h1>
      {/* {hasPrivilege("UserList") && ( */}
      {/* <Table
        columns={columns}
        query={GET_ALL_USERS_QUERY}
        module="users"
        canCreate={hasPrivilege("UserRegister")}
        canEdit={hasPrivilege("UserUpdate")}
        actionsEnable={hasPrivilege("UserUpdate")}
        keyColumn={"userName"}
      /> */}
      {/* )} */}
    </>
  );
};

export default Users;
