import React, { useRef, useState, useEffect } from "react";
import {
    Box,
    Button,
    CardActions,
    CardContent,
    Divider,
    Grid,
    InputAdornment,
    LinearProgress,
} from "@mui/material";
import Alert from "../../components/Alert";
import Form from "../../components/Form";
import TextField from "../../components/TextField";
import { usePost } from "../../hooks";

const AddItemCategory = ({ close, loadData }) => {
    const categoryRef = useRef();
    const formRef = useRef();
    const [branch, setBranch] = useState("");

    const [formData, setFormData] = useState({
        Category_Name: undefined,
        Branch_ID: window.$branch?.Branch_ID,
        User_ID: window.$user?.id,
    });

    const { data, loading, error, handlePost } = usePost(
        "api/setting/category",
        formData
    );

    const submit = () => {
        if (formRef.current.validate()) {
            handlePost();
        }
    };

    useEffect(() => {
        if (data) {
            if (loadData) loadData();
            setTimeout(() => {
                close();
            }, 1000);
        }
    }, [data]);

    return (
        <>
            {loading ? <LinearProgress /> : null}
            <Form ref={formRef}>
                <CardContent>
                    <Alert
                        data={data}
                        success="Successfully Added"
                        error={error}
                    />
                    <Grid container spacing={{ xs: 2, md: 3, sm: 2 }}>
                        <Grid item md={12} sm={12}>
                            <TextField
                                label="Category Name"
                                fullWidth
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        Category_Name: value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Box flexGrow={1} />
                    <Button variant="outlined" onClick={() => close()}>
                        Cancel
                    </Button>
                    <Button
                        disabled={loading}
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={submit}
                    >
                        Save
                    </Button>
                </CardActions>
            </Form>
        </>
    );
};

export default AddItemCategory;
