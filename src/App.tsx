import './App.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes'
import theme from './theme'

function App() {
  const content = useRoutes(routes)
  return (
    <>
      <>
      <ThemeProvider theme={theme}>
        {/* <Notification /> */}
        <CssBaseline />
        {content}
      </ThemeProvider>
    </>
    </>
  )
}

export default App
