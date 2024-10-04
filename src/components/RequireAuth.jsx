import { CircularProgress, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, Outlet, Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, getUser } from "../rtk/UserSlice";
import { getBranch, getUserBranch } from "../rtk/BranchSlice";
import { useDispatch, useSelector } from "react-redux";
import Page from "../screens/Page";
import { status } from "../utils/constants";
import { getCompany } from "../rtk/CompanySlice";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const navigate = useNavigate();

  // NO Roles Yet
  React.useEffect(() => {
    const api_token = localStorage.getItem("auth");
    const userId = localStorage.getItem("user_id");
    window.$api_token = api_token;
    dispatch(getUser(userId));
    dispatch(getBranch(userId));
  }, [dispatch]);

  useEffect(() => {
    if (!window.$branch) {
      const localStorageBranch = JSON.parse(localStorage.getItem("branch"));
      window.$branch = localStorageBranch;
      if (!localStorageBranch) {
        navigate("/login");
      }
    }
    if (window.$branch?.Branch_ID) {
      dispatch(getCompany(window.$branch?.Branch_ID));
    }
  }, []);

  useEffect(() => {
    window.$user = currentUser.user;
  }, [currentUser]);

  return currentUser.status === status.succeeded ||
    currentUser.status === status.failed ? (
    <Page>
      <Outlet />
    </Page>
  ) : (
    <div className="w-full">
      <LinearProgress
        sx={{
          borderTopLeftRadius: (theme) => theme.shape.borderRadius,
          borderTopRightRadius: (theme) => theme.shape.borderRadius,
        }}
      />
    </div>
  );
};

export default RequireAuth;
