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
import { usePatch } from "../../hooks";

const EditItemCatogories = ({ close, item, loadData }) => {
    const formRef = useRef();

    const [formData, setFormData] = useState({
        ...item,
    });

    const { data, loading, error, handlePatch } = usePatch(
        "api/setting/category",
        formData
    );

    const submit = () => {
        if (formRef.current.validate()) {
            handlePatch();
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
            <CardContent>
                <Alert
                    data={data}
                    success="Successfully Saved..."
                    error={error}
                />
                <Form ref={formRef}>
                    <Grid container spacing={2}>
                        <Grid item md={12} sm={12}>
                            <TextField
                                label="Category Name"
                                fullWidth
                                defaultValue={formData.Category_Name}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        Category_Name: value,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>
                </Form>
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
        </>
    );
};

export default EditItemCatogories;
