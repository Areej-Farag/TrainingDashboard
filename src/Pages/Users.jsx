import { useEffect, useState, useMemo, useRef, useTransition } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Styles/main.css";

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
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useModal } from "../Context/ModalContext";
import AdminPageForm from "../Components/Forms/AdminPageForm";
import { PersonAddAlt1 } from "@mui/icons-material";
import { useUserStore } from "../Stores/UserStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Define CustomToolbar as a separate component
function CustomToolbar({
  search,
  setSearch,
  columnVisibility,
  setColumnVisibility,
  exportCSV,
  MyColumns,
}) {
  const {t} = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const searchInputRef = useRef(null); // Add ref for TextField

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  // Maintain focus after typing
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchInputRef.current?.focus(); // Ensure focus stays on the input
  };

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
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
            inputRef={searchInputRef}
            sx={{ flexGrow: 1, minWidth: 200 }}
            size="small"
            placeholder={`${t("search")}... `}
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 3 }}>
          <IconButton
            onClick={handleOpenMenu}
            color="primary"
            sx={{
              border: "1px solid",
              borderColor: "divider",
              color: theme.palette.secondary.dark,
            }}
          >
            <ViewColumnIcon />
          </IconButton>
          <Button
            sx={{ color: theme.palette.secondary.dark }}
            onClick={exportCSV}
            variant="outlined"
            startIcon={<FileDownloadIcon sx={{ ml: 1 }} />}
          >
            {t("Export CSV")}
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
          {MyColumns.map((col) => (
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

export default function Users() {
  const { showModal } = useModal();
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getUsers, loading, error, users , } = useUserStore();
  const {t} = useTranslation();
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log("users updated:", users);
  }, [users]);

  const MyColumns = [
    // {
    //   field: "IDnumber",
    //   headerName: `${t("ID")}`,
    //   width: isMobile ? 50 : 70,
    //   align: "center",
    //   headerAlign: "center",
    // },
    {
      field: "name",
      headerName: `${t("Name")}`,
      width: isMobile ? 150 : 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Email",
      headerName:` ${t("Email")}`,
      width: isMobile ? 150 : 200,
      align: "center",
      headerAlign: "center",
      hide: isMobile,
    },
    {
      field: "Type",
      headerName: `${t("Type")}`,
      width: 60,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: `${t("Phone")}`,
      width: isMobile ? 120 : 150,
      align: "center",
      headerAlign: "center",
      hide: isMobile,
    },
    {
      field: "gender",
      headerName: `${t("Gender")}`,
      width: isMobile ? 150 : 200,
      align: "center",
      headerAlign: "center",
      hide: isMobile,
    },
    {
      field: "CreatedAt",
      headerName: `${t("Created At")}`,
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "UpdatedAt",
      headerName: `${t("Updated At")}`,
      width: 170,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Actions",
      headerName: `${t("Actions")}`,
      width: 170,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const userID = params.row.id;
        return (
          <Box sx={{ display: "flex", justifyContent: "center", gap: "5px" }}>
            <Button
              sx={{
                my: "7px",
                border: `1px solid ${theme.palette.secondary.main}`,
                color: theme.palette.secondary.main,
                width: "40px",
                height: "30px",
                minWidth: "30px",
              }}
              onClick={() => {
                navigate(`/user/edit/${params.row.id}`);
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>

          </Box>
        );
      },
    },
  ];

  const initialRows = useMemo(() => {
    return (
      users?.map((user) => ({
        id: user.id,
        IDnumber: user.id,
        name: user.name,
        Email: user.email,
        Type: user.type,
        Phone: user.phone,
        gender: user.gender == 1 ? "Male" : "Female",
        CreatedAt: new Date(user.created_at).toLocaleString(),
        UpdatedAt: new Date(user.updated_at).toLocaleString(),
      })) || []
    );
  }, [users]);

  const [search, setSearch] = useState("");
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(MyColumns.map((col) => [col.field, true]))
  );

  const visibleColumns = MyColumns.filter((col) => columnVisibility[col.field]);

  const filteredRows = initialRows?.filter((row) =>
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
    <Box
      sx={{
        overflow: "hidden",
        p: 2,
        width: "90vw",
        m: "auto",
        position: "relative",
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h5">{t("Users")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Users")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAlt1 sx={{ml: 1 }}/>}
          sx={{ mb: 2, height: "40px" }}
          onClick={() => navigate("/user/add")}
        >
         {t("Add User")}
        </Button>
      </Stack>

      <CustomToolbar
        search={search}
        setSearch={setSearch}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        exportCSV={exportCSV}
        MyColumns={MyColumns}
      />

      <Box sx={{ width: "100%", height: "70vh", overflow: "hidden" }}>
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
          <DataGrid
            checkboxSelection
            rows={filteredRows || []}
            // @ts-ignore
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
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 100,
          width: { xs: "80%", sm: "40%" },
          display: "flex",
          borderRadius: "10px",
          justifyContent: "center",
          backgroundColor:
            theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
          border: `1px solid ${theme.palette.divider}`,
        }}
      ></Box>
    </Box>
  );
}
