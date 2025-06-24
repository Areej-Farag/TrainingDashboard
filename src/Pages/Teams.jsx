import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
const rows = [
  {
    id: 1,
    IDnumber: 1,
    name: "Aymen Khalil ",
    Email: "AymenKhalil123@gmail.com",
    Age: "30",
    Phone: "123-456-7890",
    Access: "Admin",
  },
  {
    id: 2,
    IDnumber: 2,
    name: "Data Grid Pro",
    Email: "the Pro version",
    Age: "30",
    Phone: "123-456-7890",
    Access: "Admin",
  },
  {
    id: 3,
    IDnumber: 3,
    name: "Data Grid Premium",
    Email: "the Premium version",
    Age: "30",
    Phone: "123-456-7890",
    Access: "User",
  },
  {
    id: 4,
    IDnumber: 4,
    name: "Data Grid Premium",
    Email: "the Premium version",
    Age: "30",
    Phone: "123-456-7890",
    Access: "User",
  },
  {
    id: 5,
    IDnumber: 5,
    name: "Data Grid Premium",
    Email: "the Premium version",
    Age: "30",
    Phone: "123-456-7890",
    Access: "Manager",
  },
];

export default function Teams() {
  const theme = useTheme();
  const columns = [
    {
      field: "IDnumber",
      headerName: "ID",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Age",
      headerName: "Age",
      width: 50,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: "Phone",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Access",
      headerName: "Access",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: ({ row: { Access } }) => {
        return (
          <Box
            sx={{
              maxWidth: "80%",
              mx: "auto",
              my: "8px",
              color: "white",
              display: "flex",
              textAlign: "center",
              justifyContent: "space-evenly",
              alignItems: "center",
              p: "5px",
              borderRadius: "5px",
              backgroundColor:
                Access === "Admin"
                  ? theme.palette.primary.dark
                  : Access === "Manager"
                  ? theme.palette.warning.dark
                  : theme.palette.secondary.dark,
            }}
          >
            {Access === "Admin" ? (
              <AdminPanelSettingsOutlinedIcon sx={{ fontSize: "small" }} />
            ) : Access === "User" ? (
              <LockOpenOutlinedIcon sx={{ fontSize: "small" }} />
            ) : (
              <SecurityOutlinedIcon sx={{ fontSize: "small" }} />
            )}

            <Typography sx={{ fontSize: "16px" }}>{Access}</Typography>
          </Box>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 170,
      align: "center",
      headerAlign: "center",
      renderCell: () => {
        return (
          <Box>
            <Button
              sx={{
                border: `1px solid ${theme.palette.secondary.dark}`,
                color: theme.palette.secondary.dark,
                mx: "5px",
                width: "20px",
                height: "30px",
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
            <Button
              sx={{
                border: `1px solid ${theme.palette.error.dark}`,
                mx: "5px",
                color: theme.palette.error.dark,
                width: "20px",
                height: "30px",
              }}
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
          </Box>
        );
      },
    },
  ];
  return (
    <div>
      <Typography variant="h4">Teams</Typography>

      <div style={{ height: "70vh", width: "98%", margin: "auto" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}
