import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  Typography,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useModal } from "../Context/ModalContext";
export default function CustomGridFree() {
  const { showModal } = useModal();
  const theme = useTheme();
  const allColumns = [
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
              onClick={() => showModal("EditContact" , () => {
                console.log("EditContact");
              })}
            >
              <EditOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
            <Button
                 onClick={() => showModal("You Sure wants to delete this contact" , () => {
                console.log("DeleteContact");
              })}
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

  const initialRows = [
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
      id: 6,
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
      id: 7,
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
      id: 8,
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
      id: 9,
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
      id: 10,
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

  function CustomToolbar({
    search,
    setSearch,
    columnVisibility,
    setColumnVisibility,
    exportCSV,
  }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    return (
      <Box
        sx={{
          mb: 2,
          p: 2,
          borderRadius: 2,
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Box>
            <TextField
              sx={{ flexGrow: 1, minWidth: 200 }}
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1 }} />,
              }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <IconButton
              onClick={handleOpenMenu}
              color="primary"
              sx={{ border: "1px solid", borderColor: "divider" }}
            >
              <ViewColumnIcon />
            </IconButton>
            <Button
              onClick={exportCSV}
              variant="outlined"
              startIcon={<FileDownloadIcon />}
            >
              Export CSV
            </Button>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            PaperProps={{
              sx: {
                maxHeight: 300,
                bgcolor: theme.palette.background.paper,
                color: theme.palette.text.primary,
              },
            }}
          >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
              Toggle Columns
            </Typography>
            <Divider />
            {allColumns.map((col) => (
              <MenuItem key={col.field}>
                <Checkbox
                  checked={columnVisibility[col.field]}
                  onChange={(e) =>
                    setColumnVisibility((prev) => ({
                      ...prev,
                      [col.field]: e.target.checked,
                    }))
                  }
                />
                {col.headerName}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      </Box>
    );
  }
  const [search, setSearch] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState(
    Object.fromEntries(allColumns.map((col) => [col.field, true]))
  );

  const visibleColumns = allColumns.filter(
    (col) => columnVisibility[col.field]
  );

  const filteredRows = initialRows.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const exportCSV = () => {
    const headers = visibleColumns.map((col) => col.headerName).join(",");
    const data = filteredRows.map((row) =>
      visibleColumns.map((col) => row[col.field]).join(",")
    );
    const csvContent = [headers, ...data].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ overflow: "hidden", p: 2, width: "90vw", m: "auto" }}>
      <Typography variant="h5">Contacts</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        List of all contacts
      </Typography>
      <CustomToolbar
        search={search}
        setSearch={setSearch}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        exportCSV={exportCSV}
      />
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
            checkboxSelection
            rows={filteredRows}
            columns={visibleColumns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            sx={{
              bgcolor: "background.paper",
              color: "text.primary",
              fontSize: 12,
              "& .MuiDataGrid-columnHeaders": { fontSize: 13 },
              "& .MuiDataGrid-virtualScroller": {
                overflowX: "auto",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
