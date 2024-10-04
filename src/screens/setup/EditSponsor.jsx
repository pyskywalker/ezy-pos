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
import { usePatch, usePost } from "../../hooks";
import { useSelector } from "react-redux";

import { getCurrentUser } from "../../rtk/UserSlice";

const EditSponsor = ({ close, loadData, item }) => {
  const categoryRef = useRef();
  const formRef = useRef();
  const currentUser = useSelector(getCurrentUser);

  const [formData, setFormData] = useState({
    ...item,
    Branch_ID: window.$branch?.Branch_ID,
    User_ID: window.$user?.User_ID,
  });

  const { data, loading, error, handlePatch } = usePatch(
    "api/setting/sponsor",
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
      <Form ref={formRef}>
        <CardContent>
          <Alert data={data} success="Successfully Added" error={error} />
          <Grid container spacing={{ xs: 2, md: 3, sm: 2 }}>
            <Grid item md={12} sm={12}>
              <TextField
                label="Sponsor Name"
                fullWidth
                defaultValue={formData.Sponsor_Name}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    Sponsor_Name: value,
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
            onClick={submit}>
            Save
          </Button>
        </CardActions>
      </Form>
    </>
  );
};

export default EditSponsor;
