
export const myTheme = (mode) => ({
    palette: {
      primary: {
        main: '#87469c',
      },
      secondary: {
        main: '#9d2da6',
      },
     mode,
     ...(mode === 'light' && {
       // palette values for light mode
      //  primary: {
      //    main: '#6A2181',
      //  },
    //    secondary: {
    //      main: '#f50057',
    //    },
     }),
     ...(mode === 'dark' && {
       // palette values for dark mode
       primary: {
        main: '#6A2181',
      },
       secondary: {
         main: '#C05DB3',
       },
     }),
    },
})