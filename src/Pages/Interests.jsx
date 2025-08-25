import { useEffect, useState, useMemo, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Styles/main.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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
import { useTranslation } from "react-i18next";
import useInterstesStore from "../Stores/InterestsStore";
import InterestsForm from "../Components/Forms/InterestsForm";

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

export default function Interests() {
  const { showModal } = useModal();
  const theme = useTheme();
  const [OpenEditModal, setOpenEditModal] = useState(false);
  const [OpenAddModal, setOpenAddModal] = useState(false);
  const { getInteresties, interesties, deleteInterest, loading, pagination } =
    useInterstesStore();
  const language = localStorage.getItem("lang");
  const [selectedInterest, setSelectedInterest] = useState(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    console.log("Fetching interesties...");
    getInteresties(pagination.currentPage);
  }, [getInteresties, pagination.currentPage]);

  //   useEffect(() => {
  //     console.log("Countries:", countries);
  //   }, [countries]);

  const MyColumns = [
    {
      field: "name_ar",
      headerName: `${t("Name Arabic")}`,
      width: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "name_en",
      headerName: `${t("Name English")}`,
      width: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "CreatedAt",
      headerName: `${t("Created At")}`,
      width: 170,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "UpdatedAt",
      headerName: `${t("Updated At")}`,
      width: 170,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
    },
    {
      field: "Actions",
      headerName: `${t("Actions")}`,
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "custom-header",
      cellClassName: "custom-cell",
      renderCell: (params) => {
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
                console.log("Opening Edit Modal for country:", params.row);
                setOpenEditModal(true);
                setSelectedInterest(params.row);
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
            <Button
              onClick={() =>
                showModal(
                  t("Are you sure you want to delete this item?"),
                  () => {
                    deleteInterest(params.row.id);
                  }
                )
              }
              sx={{
                m: "7px",
                border: `1px solid ${theme.palette.error.dark}`,
                color: theme.palette.error.dark,
                width: "43px",
                height: "30px",
                minWidth: "30px",
              }}
            >
              <DeleteOutlineOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
          </Box>
        );
      },
    },
  ];

  const initialRows = useMemo(() => {
    return (
      interesties?.map((interest) => ({
        id: interest.id,
        name_en: interest.name_en,
        name_ar: interest.name_ar,
        CreatedAt: new Date(interest.created_at).toLocaleString(),
        UpdatedAt: new Date(interest.updated_at).toLocaleString(),
      })) || []
    );
  }, [interesties, language]);

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
        overflow: "auto",
        p: 2,
        width: "90vw",
        m: "auto",
        position: "relative",
        direction: i18n.dir(),
      }}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box>
          <Typography variant="h5">{t("Interests")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Interests")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddOutlinedIcon sx={{ ml: 2 }} />}
          sx={{ mb: 2, height: "40px" }}
          onClick={() => {
            console.log("Opening Add Modal");
            setOpenAddModal(true);
          }}
        >
          {t("Add Interest")}
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
              getInteresties(model.page + 1);
            }}
            disableColumnAutoWidth
            columnVisibilityModel={columnVisibility}
            getCellClassName={(params) => `custom-cell ${params.field}-cell`}
            getHeaderClassName={(params) =>
              `custom-header ${params.field}-header`
            }
            pagination
            paginationMode="server"
            rowCount={pagination.total || 0}
            loading={loading}
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

      {(OpenAddModal || OpenEditModal) && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1300,
            width: { xs: "80%", sm: "40%" },
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
            border: `1px solid ${theme.palette.divider}`,
            direction: i18n.dir(),
          }}
        >
          {OpenAddModal && (
            <InterestsForm setOpen={setOpenAddModal} action="Add Interest" />
          )}
          {OpenEditModal && (
            <InterestsForm
              setOpen={setOpenEditModal}
              action="Edit Interest"
              propInterest={selectedInterest}
            />
          )}
        </Box>
      )}
    </Box>
  );
}
