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
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useModal } from "../Context/ModalContext";
import { useAdminStore } from "../Stores/AdminStore";
import { PersonAddAlt1 } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
            placeholder={`${t("search")}…`}
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

export default function Admins() {
  const { showModal } = useModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { admins, getAdmins, DestroyAdmin, loading, pagination } =
    useAdminStore();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const featureOptions = [
    { id: 1, value: t("features.privateChat") },
    { id: 2, value: t("features.publicChat") },
    { id: 3, value: t("features.shortVideo") },
    { id: 4, value: t("features.ads") },
    { id: 5, value: t("features.deals") },
    { id: 6, value: t("features.delivery") },
  ];

  useEffect(() => {
    getAdmins(pagination.currentPage);
  }, [getAdmins, pagination.currentPage]);

  useEffect(() => {
    console.log("admins updated:", admins);
  }, [admins]);

  const MyColumns = [
    {
      field: "name",
      headerName: t("Name"),
      width: isMobile ? 100 : 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "Email",
      headerName: t("Email"),
      width: isMobile ? 100 : 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      hide: isMobile,
    },
    {
      field: "Type",
      headerName: t("Type"),
      width: 60,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "Phone",
      headerName: t("Phone"),
      width: isMobile ? 80 : 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      hide: isMobile,
    },
    {
      field: "CreatedAt",
      headerName: t("Created At"),
      width: isMobile ? 140 : 170,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "UpdatedAt",
      headerName: t("Updated At"),
      width: isMobile ? 140 : 170,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "Actions",
      headerName: t("Actions"),
      width: isMobile ? 130 : 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      hide: false, // Explicitly prevent hiding
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <Button
            sx={{
              my: "7px",
              border: `1px solid ${theme.palette.secondary.main}`,
              color: theme.palette.secondary.main,
              width: "35px",
              height: "30px",
              minWidth: "30px",
            }}
            onClick={() => navigate(`/admin/edit/${params.row.id}`)}
          >
            <EditOutlinedIcon sx={{ fontSize: "small" }} />
          </Button>
          <Button
            onClick={() =>
              showModal(
                t("Are you sure you want to delete this admin?"),
                () => {
                  DestroyAdmin(params.row.id);
                }
              )
            }
            sx={{
              m: "7px",
              border: `1px solid ${theme.palette.error.dark}`,
              color: theme.palette.error.dark,
              width: "38px",
              height: "30px",
              minWidth: "30px",
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: "small" }} />
          </Button>
        </Box>
      ),
    },
  ];

  const initialRows = useMemo(() => {
    return (
      admins?.map((admin) => ({
        id: admin.id,
        name: admin.name,
        Email: admin.email,
        Type:
          featureOptions.find((option) => option.id.toString() === admin.type)
            ?.value || "Unknown",
        Phone: admin.phone || "N/A",
        CreatedAt: new Date(admin.created_at).toLocaleString(),
        UpdatedAt: new Date(admin.updated_at).toLocaleString(),
      })) || []
    );
  }, [admins, t]);

  const [search, setSearch] = useState("");
  const [columnVisibility, setColumnVisibility] = useState(
    Object.fromEntries(MyColumns.map((col) => [col.field, true]))
  );

  useEffect(() => {
    setColumnVisibility((prev) => ({
      ...prev,
      Actions: true,
    }));
  }, []);

  const visibleColumns = MyColumns.filter((col) => columnVisibility[col.field]);

  const filteredRows = initialRows?.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const exportCSV = () => {
    const headers = visibleColumns.map((col) => col.headerName).join(",");
    const data = filteredRows.map((row) =>
      visibleColumns.map((col) => `"${row[col.field]}"`).join(",")
    );
    const csvContent = [headers, ...data].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "admins.csv");
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
      <Stack direction="row" justifyContent="space-between">
        <Box>
          <Typography variant="h5">{t("Admins")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Admins")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<PersonAddAlt1 />}
          sx={{ mb: 2, height: "40px" }}
          onClick={() => navigate("/admin/add")}
        >
          <Typography variant="body1" sx={{ mx: 2 }}>
            {t("Add Admin")}
          </Typography>
        </Button>
      </Stack>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      )}

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
            // إضافة CSS مخصص لعكس Pagination للغة العربية
            "& .MuiDataGrid-footerContainer": {
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
            },
            "& .MuiTablePagination-toolbar": {
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
              padding: i18n.language === "ar" ? "0 16px 0 0" : "0 0 0 16px",
            },
            "& .MuiTablePagination-actions": {
              flexDirection: i18n.language === "ar" ? "row-reverse" : "row",
              marginLeft: i18n.language === "ar" ? "20px" : "0",
              marginRight: i18n.language === "ar" ? "0" : "20px",
            },
            "& .MuiTablePagination-spacer": {
              flex: i18n.language === "ar" ? "1" : "0",
            },
            "& .MuiTablePagination-selectLabel": {
              margin: i18n.language === "ar" ? "0 0 0 16px" : "0 16px 0 0",
            },
            "& .MuiTablePagination-displayedRows": {
              margin: i18n.language === "ar" ? "0 16px 0 0" : "0 0 0 16px",
            },
            // عكس اتجاه أيقونات الأسهم
            "& .MuiTablePagination-actions > button:first-of-type": {
              transform: i18n.language === "ar" ? "scaleX(-1)" : "none",
            },
            "& .MuiTablePagination-actions > button:last-of-type": {
              transform: i18n.language === "ar" ? "scaleX(-1)" : "none",
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={filteredRows || []}
            // @ts-ignore
            columns={visibleColumns}
            pageSizeOptions={[pagination.perPage || 10]}
            paginationModel={{
              page: (pagination.currentPage || 1) - 1,
              pageSize: pagination.perPage || 10,
            }}
            onPaginationModelChange={(model) => {
              getAdmins(model.page + 1);
            }}
            pagination
            paginationMode="server"
            rowCount={pagination.total || 0}
            loading={loading}
            disableColumnAutoWidth
            columnVisibilityModel={columnVisibility}
            getCellClassName={(params) => `custom-cell ${params.field}-cell`}
            getHeaderClassName={(params) =>
              `custom-header ${params.field}-header`
            }
            sx={{
              width: "fit-content",
              minWidth: "100%",
              "& .MuiDataGrid-columnHeader": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0 8px",
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
              "& .MuiDataGrid-actionsContainer": {
                direction: i18n.language === "ar" ? "rtl" : "ltr",
              },
              direction: i18n.language === "ar" ? "rtl" : "ltr",
              // تعديل إضافي لعكس أيقونات الأسهم
              "& .MuiSvgIcon-root": {
                // transform: i18n.language === "ar" ? "rotateX(145deg)" : "none",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
