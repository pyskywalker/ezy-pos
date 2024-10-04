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
import { useFetch, usePost } from "../../hooks";
import Select from "../../components/Select";

const AddItemSubcategory = ({ close, loadData }) => {
    const categoryRef = useRef();
    const subcategoryNameRef = useRef();
    const formRef = useRef();
    const [branch, setBranch] = useState("");

    const [formData, setFormData] = useState({
        SubCategory_Name: undefined,
        Category_ID: undefined,
        Branch_ID: window.$branch?.Branch_ID,
        User_ID: window.$user?.id,
    });

    const { data, loading, error, handlePost } = usePost(
        "api/setting/subcategory",
        formData
    );

    const {
        data: categoryList,
        loading: loadCategories,
        error: categoryError,
        handleFetch,
    } = useFetch("api/setting/category/", null, true);

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
                        <Grid item md={6} sm={12}>
                            <TextField
                                label="SubCategory Name"
                                ref={subcategoryNameRef}
                                required
                                fullWidth
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        SubCategory_Name: value,
                                    })
                                }
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={6}>
                            <Select
                                label="Item Category"
                                fullWidth
                                required
                                ref={categoryRef}
                                value={formData.Category_ID}
                                optionsText="Category_Name"
                                options={categoryList?.data?.data || []}
                                optionsValue="Category_ID"
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        Category_ID: value,
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

export default AddItemSubcategory;
