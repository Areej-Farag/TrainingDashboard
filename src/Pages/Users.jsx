import { useEffect, useState, useMemo, useRef } from "react";
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
  Avatar,
  textFieldClasses,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useUserStore } from "../Stores/UserStore";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";

function CustomToolbar({
  search,
  setSearch,
  columnVisibility,
  setColumnVisibility,
  exportCSV,
  MyColumns,
}) {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const searchInputRef = useRef(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    searchInputRef.current?.focus();
  };

  return (
    <Box
      sx={{
        mb: 2,
        p: 2,
        borderRadius: 2,
        backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
        border: `1px solid ${theme.palette.divider}`,
        direction: i18n.dir(),
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
              direction: i18n.dir(),
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
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getUsers, users } = useUserStore();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getUsers();
  }, []);

  const MyColumns = [
    {
      field: "image",
      headerName: `${t("Profile Image")}`,
      width: isMobile ? 60 : 80,
      flex: 0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Avatar
          src={params.row.image}
          alt={params.row.name}
          sx={{ width: 30, height: 30 }}
        />
      ),
    },
    {
      field: "name",
      headerName: `${t("Name")}`,
      width: isMobile ? 120 : 180,
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      cellClassName: "truncate-cell",
    },
    {
      field: "Email",
      headerName: `${t("Email")}`,
      width: isMobile ? 150 : 220,
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: "truncate-cell",
    },
    {
      field: "Type",
      headerName: `${t("Type")}`,
      width: isMobile ? 80 : 100,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Phone",
      headerName: `${t("Phone")}`,
      width: isMobile ? 120 : 150,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sign_in_type",
      headerName: `${t("SignIn Type")}`,
      width: isMobile ? 100 : 120,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gender",
      headerName: `${t("Gender")}`,
      width: isMobile ? 80 : 100,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "is_active",
      headerName: `${t("Activity")}`,
      width: isMobile ? 90 : 110,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "is_private",
      headerName: `${t("Privacy")}`,
      width: isMobile ? 90 : 110,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "CreatedAt",
      headerName: `${t("Created At")}`,
      width: isMobile ? 140 : 170,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "UpdatedAt",
      headerName: `${t("Updated At")}`,
      width: isMobile ? 140 : 170,
      flex: 0,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "isVerified",
      headerName: `${t("Verification")}`,
      width: isMobile ? 110 : 140,
      flex: 0,
      align: "center",
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.value === "Verified" ? "blue" : "inherit",
          }}
        >
          {params.value}
        </Typography>
      ),
      headerAlign: "center",
    },
    {
      field: "Actions",
      headerName: `${t("Actions")}`,
      width: isMobile ? 150 : 180,
      flex: 0,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            sx={{
              minWidth: 30,
              p: 0.5,
              border: `1px solid ${theme.palette.secondary.main}`,
              color: theme.palette.secondary.main,
            }}
            onClick={() => navigate(`/user/edit/${params.row.id}`)}
          >
            <EditOutlinedIcon sx={{ fontSize: "small" }} />
          </Button>
          {(params.row.isVerified === "Pending" ||
            (params.row.is_verified === 0 &&
              (params.row.verify_image !== null ||
                params.row.number_verify !== null))) && (
            <Button
              sx={{
                minWidth: 30,
                p: 0.5,
                border: `1px solid #0073ffff`,
                color: "#0073ffff",
              }}
              onClick={() => navigate(`/user/verify/${params.row.id}`)}
            >
              <VerifiedOutlinedIcon sx={{ fontSize: "15px" }} />
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const initialRows = useMemo(() => {
    return (
      users?.map((user) => ({
        id: user.id,
        image: user.image,
        name: user.name,
        Email: user.email,
        Type: user.type,
        Phone: user.phone,
        sign_in_type: user.sign_in_type,
        gender: user.gender === 1 ? "Male" : "Female",
        is_active: user.status === 1 ? "Active" : "Inactive",
        is_private: user.is_private === 1 ? "Private" : "Public",
        CreatedAt: new Date(user.created_at).toLocaleString(),
        UpdatedAt: new Date(user.updated_at).toLocaleString(),
        isVerified:
          user.is_verified === 1 ? (
            <Typography sx={{ color: "green" }}>Verified</Typography>
          ) : user.is_verified === 0 &&
            (!user.verify_image || !user.number_verify) ? (
            "Not Verified"
          ) : (
            "Pending"
          ),
        is_verified: user.is_verified,
        verify_image: user.verify_image,
        number_verify: user.number_verify,
      })) || []
    );
  }, [users]);

  const [search, setSearch] = useState("");
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility = {};
    MyColumns.forEach((col) => {
      initialVisibility[col.field] = true;
    });
    return initialVisibility;
  });

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
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        width: "90vw",
        maxWidth: "100%",
        mx: "auto",
        p: 2,
        overflow: "hidden",
        direction: i18n.dir(),
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5">{t("Users")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Users")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAlt1 />}
          onClick={() => navigate("/user/add")}
          sx={{ height: 40 }}
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

      <Box
        sx={{
          width: "100%",
          height: "70vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "auto",
          }}
        >
          <DataGrid
            rows={filteredRows || []}
            columns={visibleColumns}
            pageSize={8}
            rowsPerPageOptions={[8, 10]}
            columnVisibilityModel={columnVisibility}
            density={isMobile ? "compact" : "standard"}
            disableColumnMenu
            disableSelectionOnClick
            sx={{
              width: "fit-content",
              minWidth: "100%",
              "& .MuiDataGrid-columnHeader": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 8px",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#2d2d2d" : "#f5f5f5",
              },
              "& .MuiDataGrid-cell": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 8px",
                textAlign: "center",
              },
              "& .truncate-cell": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflow: "auto !important",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
