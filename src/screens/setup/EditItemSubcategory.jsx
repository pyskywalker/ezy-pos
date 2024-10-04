import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
} from "@mui/material";
import Alert from "../../components/Alert";
import Form from "../../components/Form";
import TextField from "../../components/TextField";
import { usePost } from "../../hooks";

const EditItemSubcategory = ({ close, item }) => {
    const formRef = useRef();

    const [formData, setFormData] = useState({
        ...item,
    });

    const { data, loading, error, handlePost } = usePost("api/login", formData);

    const submit = () => {
        if (formRef.current.validate()) {
            handlePost();
        }
    };
    return (
        <>
            {loading ? <LinearProgress /> : null}
            <CardContent>
                <Alert data={data} success="Successfully Added" error={error} />
                <Form ref={formRef}>
                    <Grid container spacing={2}></Grid>
                </Form>
            </CardContent>
            <Divider />
            <CardActions>
                <Box flexGrow={1} />
                <Button variant="outlined" onClick={() => close()}>
                    Cancel
                </Button>
                <Button disabled={loading} variant="solid" onClick={submit}>
                    Save
                </Button>
            </CardActions>
        </>
    );
};

export default EditItemSubcategory;
