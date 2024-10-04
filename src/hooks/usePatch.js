import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const usePatch = (uri, payload = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePatch = (newUri, newPayload = null) => {
        if (typeof newUri === "string") {
            uri = newUri;
        }

        if (newPayload) {
            payload = newPayload;
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
            Authorization: auth ? `${auth.type} ${auth.token}` : null,
        };

        window.axios
            .put(BASE_URL + uri, payload, { headers })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    };

    return { data, loading, error, handlePatch };
};

export default usePatch;
