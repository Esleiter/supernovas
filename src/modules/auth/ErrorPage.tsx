import { Box, Container, Typography, styled } from '@mui/material'

const MainContent = styled(Box)(
  () => `
      height: 100vh;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
)

const ErrorPage = () => {
  return (
    <MainContent>
      <Container maxWidth="md">
        <Box textAlign="center" mb={3}>
          <Container maxWidth="xs">
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
              No autorizado
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Esta página no esta disponible.
            </Typography>
          </Container>
          <img
            alt="Coming Soon"
            height={200}
            src="/coming-soon.svg"
          />
        </Box>
      </Container>
    </MainContent>
  )
}

export default ErrorPage
