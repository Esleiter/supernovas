import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans'].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 'bold'
    }
  },
  palette: {
    primary: {
      main: '#737080'
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#1B8ACE',
            '.MuiListItemIcon-root': {
              color: 'white'
            },
            '.MuiListItemText-root': {
              color: 'white'
            }
          }
        }
      }
    }
  }
})

export default theme