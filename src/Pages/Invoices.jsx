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
    { field: "IDnumber", headerName: "ID", minWidth: 70 },
    { field: "RegestreID", headerName: "Regestre ID", minWidth: 110 },
    { field: "name", headerName: "Name", minWidth: 150 },
    { field: "Email", headerName: "Email", minWidth: 150 },
    { field: "Age", headerName: "Age", minWidth: 70 },
    { field: "Phone", headerName: "Phone", minWidth: 150 },
    { field: "Address", headerName: "Address", minWidth: 150 },
    { field: "City", headerName: "City", minWidth: 150 },
    { field: "ZIPCode", headerName: "ZIP Code", minWidth: 100 },
    {
      field: "Actions",
      headerName: "Actions",
      minWidth: 170,
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
    <Box sx={{ overflow: "hidden", p: 1, width: "90vw", m: "auto" }}>
      <Typography variant="h5" style={{ marginLeft: "10px" }}>
        Invoices
      </Typography>
      <Typography variant="body1" style={{ margin: "5px 10px" }}>
        List of all Invoices
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            overflowX: "auto",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.grey[400],
              borderRadius: "4px",
            },
          }}
        >
          {/* <Box sx={{ minWidth: isMobile ? "600px" : "800px", height: "100%" }}> */}
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            sx={{
              fontSize: 12,
              "& .MuiDataGrid-columnHeaders": { fontSize: 13 },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto", // تأكيد السكرول الأفقي داخل الجدول
              },
            }}
          />
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
