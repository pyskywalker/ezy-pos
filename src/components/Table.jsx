import React, { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  InputAdornment,
  LinearProgress,
  Pagination,
  Stack,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { North as NorthIcon, South as SouthIcon } from "@mui/icons-material";
import { Search as SearchIcon } from "./icons";
import { styled } from "@mui/material/styles";
import Select from "./Select";
import TextField from "./TextField";

const NoItemsOverlayContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: 160,
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

const NoItemsOverlay = ({ message }) => {
  return (
    <NoItemsOverlayContainer>
      <svg width="120" height="100" viewBox="0 0 184 152" focusable="false">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Typography mt={1} variant="body2" color="text.secondary">
        {message || "No data available"}
      </Typography>
    </NoItemsOverlayContainer>
  );
};

const ColumnHeaderContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  height: "100%",
  cursor: "pointer",
  "&:hover .MuiSvgIcon-root.sort-hint": {
    display: "inline-block",
    opacity: theme.palette.mode === "light" ? 0.48 : 0.62,
  },
}));

const ColumnHeaderTitleContainer = styled("div")(({ theme }) => ({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const PageSizeSelect = ({ placeholder, pageSize, onChange, sx }) => {
  return (
    <Select
      placeholder={placeholder}
      options={[5, 10, 25, 50, 100, 250]}
      value={pageSize}
      onChange={onChange}
      inputProps={{ sx: { py: "6px" } }}
      sx={{ width: 80, ...(sx || {}) }}
    />
  );
};

const SearchTextField = ({ placeholder, onChange, sx }) => {
  return (
    <TextField
      variant="outlined"
      placeholder={placeholder || "Search"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      inputProps={{ sx: { py: "6px" } }}
      sx={{ width: 128, ...(sx || {}) }}
      onChange={onChange}
    />
  );
};

const Table = ({
  loading,
  columns,
  items,
  initialState,
  itemCount,
  page,
  pageSize,
  onPageChange,
  hidePaginationFooter,
  checkboxSelection,
  onCheck,
  wrapperStyles,
  ...rest
}) => {
  columns = columns.filter(
    (col) => typeof col.show === "undefined" || col.show
  );

  const [state, setState] = useState({
    items,
    sorterField: "",
    sortDirection: "",
    selected: [],
    ...(initialState || {}),
  });

  useEffect(() => {
    if (state.sortDirection === "asc") {
      setState({
        ...state,
        items: [...items].sort((a, b) => {
          if (a[state.sorterField] < b[state.sorterField]) {
            return -1;
          }

          if (a[state.sorterField] > b[state.sorterField]) {
            return 1;
          }

          return 0;
        }),
      });
    } else if (state.sortDirection === "desc") {
      setState({
        ...state,
        items: [...items].sort((a, b) => {
          if (a[state.sorterField] < b[state.sorterField]) {
            return 1;
          }

          if (a[state.sorterField] > b[state.sorterField]) {
            return -1;
          }

          return 0;
        }),
      });
    } else {
      setState({ ...state, items });
    }
  }, [state.sortDirection]);

  useEffect(() => {
    setState({ ...state, items });
  }, [items]);

  const getNumberOfPages = () => {
    return Math.ceil(itemCount || 0 / pageSize || 0);
  };

  return (
    <Box sx={[{ ...wrapperStyles }, { minWidth: 300, overflowX: "auto" }]}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {checkboxSelection ? (
              <TableCell component="th">
                <Checkbox
                  checked={
                    state.items.length > 0 &&
                    state.selected.length === state.items.length
                  }
                  onChange={(event) => {
                    const selected = event.target.checked ? state.items : [];
                    setState({ ...state, selected });

                    if (typeof onCheck === "function") {
                      onCheck(selected);
                    }
                  }}
                />
              </TableCell>
            ) : null}
            {columns.map((col, index) => (
              <TableCell
                key={index}
                component="th"
                {...(col.tableCellProps || {})}>
                <ColumnHeaderContainer
                  onClick={() => {
                    if (
                      typeof col.sortable === "undefined" ||
                      col.sortable === true
                    ) {
                      setState({
                        ...state,
                        sorterField: col.field,
                        sortDirection:
                          state.sorterField !== col.field ||
                          (state.sorterField === col.field &&
                            !state.sortDirection)
                            ? "asc"
                            : state.sorterField === col.field &&
                              state.sortDirection === "asc"
                            ? "desc"
                            : "",
                      });
                    }
                  }}>
                  <ColumnHeaderTitleContainer>
                    {col.headerName}
                  </ColumnHeaderTitleContainer>
                  {typeof col.sortable === "undefined" ||
                  col.sortable === true ? (
                    <>
                      <NorthIcon
                        fontSize="11"
                        className={
                          state.sorterField !== col.field ||
                          (state.sorterField === col.field &&
                            !state.sortDirection)
                            ? "sort-hint"
                            : undefined
                        }
                        sx={{
                          display:
                            state.sortDirection === "asc" &&
                            state.sorterField === col.field
                              ? "inline-block"
                              : "none",
                        }}
                      />
                      <SouthIcon
                        fontSize="11"
                        sx={{
                          display:
                            state.sortDirection === "desc" &&
                            state.sorterField === col.field
                              ? "inline-block"
                              : "none",
                        }}
                      />
                    </>
                  ) : null}
                </ColumnHeaderContainer>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ p: 0, borderBottom: "none" }}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          ) : null}
          {state.items.length > 0 ? (
            <>
              {state.items.map((item, index, array) => (
                <TableRow
                  key={index}
                  selected={state.selected.indexOf(item) !== -1}>
                  {checkboxSelection ? (
                    <TableCell component="th">
                      <Checkbox
                        checked={state.selected.indexOf(item) !== -1}
                        onChange={(event) => {
                          const selected = event.target.checked
                            ? [...state.selected, item]
                            : state.selected.filter(
                                (e, i) => i !== state.selected.indexOf(item)
                              );
                          setState({ ...state, selected });

                          if (typeof onCheck === "function") {
                            onCheck(selected);
                          }
                        }}
                      />
                    </TableCell>
                  ) : null}
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex} {...(col.tableCellProps || {})}>
                      {typeof col.renderCell === "function"
                        ? col.renderCell(item, index, array)
                        : typeof col.valueGetter === "function"
                        ? col.valueGetter(item, index, array)
                        : item[col.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <NoItemsOverlay />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </MuiTable>
      {!hidePaginationFooter ? (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          pt={2}
          borderTop={(theme) => `1px solid ${theme.palette.divider}`}>
          {itemCount ? (
            <Typography variant="body2">
              Showing {pageSize * (page - 1) + 1}-
              {pageSize * (page - 1) + items.length} of {itemCount}
            </Typography>
          ) : null}
          <Box flexGrow={1} />
          <Pagination
            page={page}
            count={getNumberOfPages()}
            boundaryCount={3}
            shape="rounded"
            color="primary"
            onChange={(event, page1) => {
              if (typeof onPageChange === "function") {
                onPageChange(page1);
              }
            }}
          />
        </Stack>
      ) : null}
    </Box>
  );
};

export { NoItemsOverlay, PageSizeSelect, SearchTextField };
export default Table;
