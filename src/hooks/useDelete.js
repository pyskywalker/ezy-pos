import { useState } from "react";

const useDelete = (uri = null) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = (newUri) => {
    if (typeof newUri === "string") {
      uri = newUri;
    }

    setError(null);
    setLoading(true);

    let auth = window.localStorage.getItem("auth");
    if (auth) {
      try {
        auth = JSON.parse(auth);
      } catch (error) {
        // ignore
      }
    }

    const headers = {
      "Authorization": auth ? `${auth.type} ${auth.token}` : null
    };

    window.axios.delete("/" + uri, { headers })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return { data, loading, error, handleDelete };
};

export default useDelete;
