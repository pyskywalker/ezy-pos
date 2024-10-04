import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import {
  // Alert,
  Box,
  Button,
  InputAdornment,
  LinearProgress,
  Link,
  Paper,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Person,
} from "@mui/icons-material";
import Form from "../../components/Form";
import TextField from "../../components/TextField";

import Logo from "../../images/logo";

import { usePost } from "../../hooks";
// import { formatError } from "../../helpers";

const LogIn = () => {
  const navigate = useNavigate();
  const alert = useRef();
  const formRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const { data, loading, error, handlePost } = usePost("api/login", formData);

  const getLocation = (role) => {
    if (role == "Root") return "/hms/admin/dashboard";
    if (role == "Reception") return "/hms/reception";
  };

  useEffect(() => {
    if (data) {
      window.$user = data.data.user;
      localStorage.setItem("user_id", data.data?.user?.User_ID);
      window.$branch = data.data.Branch[0];
      localStorage.setItem("branch", JSON.stringify(data.data.Branch[0]));
      console.log(data.data.authorization);
      localStorage.removeItem("auth");
      localStorage.setItem("auth", JSON.stringify(data.data.authorization));

      window.setTimeout(() => {
        navigate("/private/checkout");
      }, 1000);
    }
  }, [data]);

  // const submitLogin = (setSubmitting, values) => {
  //   axios
  //     .post(`${BASE_URL}auth/login`, values)
  //     .then((response) => {
  //       localStorage.setItem("user_token", response.data?.data?.token);
  //       localStorage.setItem("user_id", response.data?.data?.user?._id);
  //       alert.current.showSuccess(response.data.message, 3000);
  //       if (response.data?.success == false) {
  //         setTimeout(() => {
  //           openModal();
  //         }, 1000);
  //       } else {
  //         setTimeout(() => {
  //           setSubmitting(false);
  //           navigate(getLocation(response.data?.data?.user?.role?.name));
  //         }, [2000]);
  //       }
  //     })
  //     .catch((error) => {
  //       reportErrors(alert.current, error);
  //     });
  // };

  // useEffect(() => {
  //   document.title = `Login - ${window.APP_NAME}`;
  // }, []);

  // useEffect(() => {
  //   if (data) {
  //     window.user = data.data.user;
  //     window.localStorage.removeItem("auth");
  //     window.localStorage.setItem(
  //       "auth",
  //       JSON.stringify(data.data.authorization)
  //     );
  //     window.setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 1000);
  //   }
  // }, [data]);

  const handleSubmit = () => {
    if (formRef.current.validate()) {
      handlePost();
    }
  };

  // const handleFeedback = () => {
  //   if (data || error) {
  //     return (
  //       <Alert sx={{ mb: 2 }} severity={error ? "error" : "success"}>
  //         {error ? formatError(error) : data ? data.message : null}
  //       </Alert>
  //     );
  //   }

  //   return null;
  // };

  return (
    <>
      <Paper
        sx={{
          borderRadius: 2,
        }}>
        {loading && (
          <LinearProgress
            sx={{
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
            }}
          />
        )}

        <Box
          sx={{
            paddingY: 3,
            paddingX: 5,
          }}>
          <Box
            mx="auto"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Logo
              sx={{
                height: 100,
                width: 100,
                marginBottom: 4,
              }}
              alt="Logo"
            />
          </Box>

          <Alert
            data={data}
            error={error}
            success={"Logged In Successfully..."}
          />

          <Form ref={formRef}>
            <TextField
              ref={emailRef}
              placeholder="Username"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              containerProps={{ sx: { mb: 2 } }}
              onChange={(value) => setFormData({ ...formData, name: value })}
            />
            <TextField
              ref={passwordRef}
              placeholder="Password"
              type="password"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              containerProps={{ sx: { mb: 4 } }}
              onChange={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
          </Form>
          <Button
            disabled={loading}
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}>
            Login
          </Button>

          <Link
            variant="body2"
            underline="hover"
            align="center"
            display="block"
            mt={4}
            // mb={}
            // onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Link>
        </Box>
      </Paper>
    </>
  );
};

export default LogIn;
