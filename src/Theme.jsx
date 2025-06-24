export const myTheme = (mode) => ({
    palette: {
     mode,
     ...(mode === 'light' && {
       // palette values for light mode
    //    primary: {
    //      main: '#1976d2',
    //    },
    //    secondary: {
    //      main: '#f50057',
    //    },
     }),
     ...(mode === 'dark' && {
       // palette values for dark mode
    //    primary: {
    //      main: '#1976d2',
    //    },
    //    secondary: {
    //      main: '#f50057',
    //    },
     }),
    },
})