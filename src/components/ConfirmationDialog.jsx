import React from "react";
import {
  Avatar,
  Box,
  Button,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { QuestionMarkRounded as QuestionMarkIcon } from "@mui/icons-material";

const ConfirmationDialog = ({ message, onCancel, onOk }) => {
  return (
    <>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar>
            <QuestionMarkIcon />
          </Avatar>
          <Typography>{message}</Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Box flexGrow={1} />
        <Button variant="text" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="text" onClick={onOk}>
          Yes
        </Button>
      </CardActions>
    </>
  );
};

export default ConfirmationDialog;
