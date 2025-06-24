import { Box, Typography , useTheme } from '@mui/material'
import React from 'react'
import Geo from '../Components/Geo'
export default function GeoChart() {
  const theme = useTheme()
  return (
    <Box sx={{ height: "80vh", width: "100%" }}>
      <Typography variant='h5'>Geo Chart</Typography>
      <Typography variant='body1'>dummy Data about transportation</Typography>
      <Geo />

    </Box>
  )
}
