import React , { useState , useMemo} from 'react';
import './index.css'

// Material UI imports
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ModalProvider } from './Context/ModalContext';

// My Components imports
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import { myTheme } from './Theme';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {

  const [open, setOpen] = useState(false);
  const [mode , setMode] = useState(localStorage.getItem('mode') || 'light');

 const isMobile = useMediaQuery('(max-width: 600px)');
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const theme = useMemo(
    () =>
      createTheme(
        myTheme(mode),
      ),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <ModalProvider>
    <Box sx={{ display: 'flex' , paddingLeft: isMobile ? "0px" : "50px" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleDrawerOpen} setMode={setMode} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} setOpen={setOpen}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Box>
    </Box>
    </ModalProvider>
  </ThemeProvider>
  );
}
