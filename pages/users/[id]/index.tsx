import { useRouter } from "next/router";
import { withAuthorization } from "@/lib/withAuthorization";

const User = () => {
  const router = useRouter();
  
  return (
    <div>
      <h1 className="title">Username: {router?.query?.id}</h1>
    </div>
  );
};

export default withAuthorization(User, "UserList");
