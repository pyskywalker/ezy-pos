import { useCallback, useEffect, useRef, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useSnackbar } from "notistack";
import { formatError, reportErrors } from "../utils/helpers";

const useFetch = (
  uri,
  params = null,
  fetchOnMount = true,
  initialData = null,
  callback = null
) => {
  const ignore = useRef(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const queryString = JSON.stringify(params || {});

  const handleFetch = useCallback(() => {
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
      Authorization: auth ? `${auth.type} ${auth.token}` : null,
    };

    window.axios
      .get(BASE_URL + uri, { params, headers })
      .then((response) => {
        if (!ignore.current) {
          setData(callback ? callback(response) : response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!ignore.current) {
          setLoading(false);
          setError(error);
          let variant = "error";
          enqueueSnackbar(formatError(error), { variant: variant });
        }
      });
  }, [uri, queryString]);

  useEffect(() => {
    ignore.current = false;
    if (fetchOnMount) {
      handleFetch();
    }

    return () => {
      ignore.current = true;
    };
  }, [handleFetch]);

  return { data, loading, error, handleFetch };
};

export default useFetch;
