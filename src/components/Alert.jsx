import { Alert as MuiAlert } from "@mui/material";
import React, { useEffect, useState } from "react";
import { reportErrors, formatError } from "../utils/helpers";

const Alert = ({ data, error, success, timeout = 2000 }) => {
    const [successTrue, setsuccessTrue] = useState(false);
    const [errorVal, setErrorVal] = useState();

    useEffect(() => {
        if (data) {
            setsuccessTrue(!!data);
            setTimeout(() => {
                setsuccessTrue(false);
            }, timeout);
        }
        if (error) {
            setErrorVal(error);
            setTimeout(() => {
                setErrorVal();
            }, timeout);
        }
    }, [data, error]);

    return successTrue || errorVal ? (
        <MuiAlert sx={{ mb: 2 }} severity={error ? "error" : "success"}>
            {error
                ? typeof error == "object"
                    ? formatError(error)
                    : error
                : data
                ? success
                : null}
        </MuiAlert>
    ) : null;
};

export default Alert;
