import { World } from './scenes/World'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { MarketplaceUI } from './components/MarketplaceUI'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <World />
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <Box sx={{ pointerEvents: 'auto' }}>
            <MarketplaceUI />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
