import { ServerIcon } from "lucide-react";
import { useState } from "react";

import getClientFetch from "../actions/client/getClientFetch";

export default function TokenTest() {
  const [data, setData] = useState("Nothing");
  const getToken = async () => {
    const res = await getClientFetch(
      "/user/security/two-fa/auth-app/AndikaTMW1"
    );

    const token = res.data.token;
    setData(token);

    console.log(res);
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={getToken} className="btn-outline-p">
        <ServerIcon />
      </button>
      <p>{data}</p>
    </div>
  );
}
