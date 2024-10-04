import { Edit } from "@mui/icons-material";
import { Button, Divider, IconButton, Paper, Typography } from "@mui/material";
import React, { useMemo, useRef, useState, useEffect } from "react";
import Table from "../../components/Table";
import Modal from "../../components/Modal";
import { useFetch } from "../../hooks";
import EditSponsor from "./EditSponsor";
import { useNavigate } from "react-router-dom";
import AddSponsor from "./AddSponsor";

const Sponsors = ({ setQuickActions }) => {
  const modalRef = useRef();
  const navigate = useNavigate();

  const {
    data: sponsorList,
    loading,
    error,
    handleFetch,
  } = useFetch("api/setting/sponsor/", null, true);

  const addSponsorModal = () => {
    let component = (
      <AddSponsor
        loadData={handleFetch}
        close={() => modalRef.current.close()}
      />
    );
    modalRef.current.open("Add Sponsor", component);
  };

  useEffect(() => {
    setQuickActions([
      {
        label: "Add Sponsors",
        name: "add_sponsor",
        onClick: () => addSponsorModal(),
      },
      {
        label: "Items",
        name: "items",
        onClick: () => navigate("/private/setup/items"),
      },
      {
        label: "Item Subcategories",
        name: "view_item_subcategories",
        onClick: () => navigate("/private/setup/subcategories"),
      },
    ]);
  }, []);

  const editSponsorModal = (item) => {
    let component = (
      <EditSponsor
        close={() => modalRef.current.close()}
        loadData={handleFetch}
        item={item}
      />
    );
    modalRef.current.open("Edit Sponsor", component);
  };

  const [params, setParams] = useState({});
  const columns = useMemo(
    () => [
      {
        field: "index",
        headerName: "S/N",
        sortable: false,
        valueGetter: (item, index) => index + 1,
      },
      {
        field: "Sponsor_Name",
        headerName: "Sponsor",
        sortable: false,
      },
      {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (item) => (
          <IconButton onClick={() => editSponsorModal(item)}>
            <Edit />
          </IconButton>
        ),
      },
    ],
    [params]
  );

  return (
    <>
      <Paper sx={{ padding: 2, height: "80vh" }}>
        <Typography
          align="left"
          sx={{
            color: (theme) => theme.palette.grey,
            marginBottom: "10px",
            fontSize: "20px",
            py: 2,
          }}>
          Sponsors
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Table
          items={sponsorList?.data?.data || []}
          columns={columns}
          wrapperStyles={{ height: "67.5vh", overflowY: "auto" }}
        />
      </Paper>
      <Modal ref={modalRef} />
    </>
  );
};

export default Sponsors;
