import React from "react";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { ChevronRightDouble as ChevronRightDoubleIcon } from "./icons";

const Page = ({ title, subtitle, breadcrumbs, children }) => {
  const getBreadcrumbs = () => {
    breadcrumbs = breadcrumbs || [];

    return (
      <Breadcrumbs separator={<ChevronRightDoubleIcon fontSize="small" />}>
        {breadcrumbs.map((e, i, a) => {
          if (e.path) {
            return (
              <Link key={e.title} color="inherit" href={e.to}>
                {e.title}
              </Link>
            );
          }

          return (
            <Typography
              key={e.title}
              {...(i === a.length - 1 ? { color: "text.primary" } : {})}>
              {e.title}
            </Typography>
          );
        })}
      </Breadcrumbs>
    );
  };

  return (
    <Box m={{ xs: 2, sm: 2, md: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        mb={{ xs: 2, sm: 2, md: 3 }}>
        {title ? (
          <>
            <Box>
              <Typography variant="h5" fontWeight="500">
                {title}
              </Typography>
              {subtitle ? (
                <Typography variant="subtitle2" color="textSecondary">
                  {subtitle}
                </Typography>
              ) : null}
            </Box>
            <Box flexGrow={1} />
          </>
        ) : null}
        {getBreadcrumbs()}
      </Stack>

      {children}
    </Box>
  );
};

export default Page;
