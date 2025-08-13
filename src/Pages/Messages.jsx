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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import useMessageStore from "../Stores/MessageStore";

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

export default function PrivateChat() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { getMessages, messages } = useMessageStore();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    getMessages();
  }, []);

  const MyColumns = [
    {
      field: "sender_id",
      headerName: `${t("Sender ID")}`,
      width: isMobile ? 80 : 100,
      // flex: 1,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      cellClassName: "truncate-cell",
    },
    {
      field: "receiver_id",
      headerName: `${t("Receiver ID")}`,
      width: isMobile ? 80 : 100,
      // flex: 1,
      minWidth: 80,
      align: "center",
      headerAlign: "center",
      cellClassName: "truncate-cell",
    },
    {
      field: "message",
      headerName: `${t("Message")}`,
      width: isMobile ? 150 : 220,
      flex: 1,
      minWidth: 150,
      align: "center",
      headerAlign: "center",
      cellClassName: "truncate-cell",
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
  ];

  const initialRows = useMemo(() => {
    return (
      messages?.map((message) => ({
        id: message.id,
        sender_id: message.sender_id,
        receiver_id: message.receiver_id,
        message: message.message,
        CreatedAt: new Date(message.created_at).toLocaleString(),
        UpdatedAt: new Date(message.updated_at).toLocaleString(),
      })) || []
    );
  }, [messages]);

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
          <Typography variant="h5">{t("Messages")}</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t("List of Messages")}
          </Typography>
        </Box>
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
