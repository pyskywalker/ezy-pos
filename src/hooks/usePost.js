import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const usePost = (uri, payload = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePost = (newUri, newPayload = null) => {
        if (typeof newUri === "string") {
            uri = newUri;
        }

        if (newPayload) {
            payload = newPayload;
        }

        setError(null);
        setLoading(true);

        let auth = localStorage.getItem("auth");
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
            .post(BASE_URL + uri, payload, { headers })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                setError(error);
            });
    };

    return { data, loading, error, handlePost };
};

export default usePost;
