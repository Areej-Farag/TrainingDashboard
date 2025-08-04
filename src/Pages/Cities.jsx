import { useEffect, useState, useMemo, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Styles/main.css";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
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
import { PersonAddAlt1 } from "@mui/icons-material";
import { useCitiesStore } from "../Stores/CitiesStore";
import CitiesAndCountriesPageForm from "../Components/Forms/CitiesAndCountriesForm";
import { useTranslation } from "react-i18next";

function CustomToolbar({
  search,
  setSearch,
  columnVisibility,
  setColumnVisibility,
  exportCSV,
  MyColumns,
}) {
  const { t } = useTranslation();
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
            placeholder={t("search")}
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
            startIcon={<FileDownloadIcon sx={{ ml: 1 }}/>}
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

export default function Cities() {
  const { showModal } = useModal();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openEditModal, setOpenEditModal] = useState(false); // Fixed typo
  const [openAddModal, setOpenAddModal] = useState(false); // Fixed typo
  const { getCities, cities, destroyCity } = useCitiesStore();
  const [selectedCity, setSelectedCity] = useState(null);
  const language = localStorage.getItem("lang");
  const { t } = useTranslation();
  useEffect(() => {
    console.log("Fetching cities...");
    getCities();
  }, [language]);

  useEffect(() => {
    console.log("Cities:", cities);
  }, [cities]);

  const MyColumns = [
    {
      field: "IDnumber",
      headerName: `${t("ID")}`,
      width: isMobile ? 50 : 70,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: `${t("Name")}`,
      width: isMobile ? 150 : 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Country",
      headerName: `${t("Country")}`,
      width: isMobile ? 150 : 200,
      align: "center",
      headerAlign: "center",
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
                console.log("Opening Edit Modal for city:", params.row);
                setOpenEditModal(true); // Fixed typo
                setSelectedCity(params.row);
              }}
            >
              <EditOutlinedIcon sx={{ fontSize: "small" }} />
            </Button>
            <Button
              onClick={() =>
                showModal(
                  t("Are you sure you want to delete this item?"),
                  () => {
                    destroyCity(params.row.id);
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
      cities?.map((City) => ({
        id: City.id,
        IDnumber: City.id,
        name: City.name,
        Country:
          language === "en" ? City.country.name_en : City.country.name_ar,
        CreatedAt: new Date(City.created_at).toLocaleString(),
        UpdatedAt: new Date(City.updated_at).toLocaleString(),
      })) || []
    );
  }, [cities, language]);

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
          <Typography variant="h5">{t("Cities")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Cities")}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddOutlinedIcon sx={{ ml: 2 }} />}
          sx={{ mb: 2, height: "40px" }}
          onClick={() => {
            console.log("Opening Add Modal");
            setOpenAddModal(true); // Fixed typo
          }}
        >
          {t("Add City")}
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

      {(openAddModal || openEditModal) && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1300, // Increased zIndex
            width: { xs: "80%", sm: "40%" },
            display: "flex",
            borderRadius: "10px",
            justifyContent: "center",
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : "#f9f9f9",
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          {openAddModal && (
            <CitiesAndCountriesPageForm
              fromWhere="cities"
              setOpen={setOpenAddModal}
              action="Add City"
            />
          )}
          {openEditModal && (
            <CitiesAndCountriesPageForm
              fromWhere="cities"
              setOpen={setOpenEditModal}
              city={selectedCity}
              action="Edit City"
            />
          )}
        </Box>
      )}
    </Box>
  );
}
