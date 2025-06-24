import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
export default function Invoices() {
  const theme = useTheme();
  const rows = [
    {
      id: 1,
      IDnumber: 1,
      name: "Aymen Khalil ",
      Email: "AymenKhalil123@gmail.com",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Admin",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 2,
      IDnumber: 2,
      name: "Data Grid Pro",
      Email: "the Pro version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Admin",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 3,
      IDnumber: 3,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "User",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 4,
      IDnumber: 4,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "User",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 5,
      IDnumber: 5,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Manager",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 1,
      IDnumber: 1,
      name: "Aymen Khalil ",
      Email: "AymenKhalil123@gmail.com",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Admin",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 2,
      IDnumber: 2,
      name: "Data Grid Pro",
      Email: "the Pro version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Admin",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 3,
      IDnumber: 3,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "User",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 4,
      IDnumber: 4,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "User",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
    {
      id: 5,
      IDnumber: 5,
      name: "Data Grid Premium",
      Email: "the Premium version",
      Age: "30",
      Phone: "123-456-7890",
      Access: "Manager",
      Address: "Elmaadie St4",
      ZIPCode: "91199",
      City: "Cairo",
      RegestreID: "12443",
    },
  ];

  const columns = [
    { field: "IDnumber", headerName: "ID", width: 70 },
    { field: "RegestreID", headerName: "Regestre ID", width: 110 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Age", headerName: "Age", width: 70 },
    { field: "Phone", headerName: "Phone", flex: 1 },
    { field: "Address", headerName: "Address", flex: 1 },
    { field: "City", headerName: "City", flex: 1 },
    { field: "ZIPCode", headerName: "ZIP Code", width: 100 },
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
      <Typography variant="h5" style={{ marginLeft: "10px" }}>
        Invoices
      </Typography>
      <Typography variant="body1" style={{ margin: "5px 10px" }}>
        List of all Invoices
      </Typography>
      <div style={{ height: "70vh", width: "98%", margin: "auto" }}>
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </div>
    </div>
  );
}
