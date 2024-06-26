import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

// function appBarLabel(label: string) {
//   return (
//     <Toolbar>
//       <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//         {label}
//       </Typography>
//     </Toolbar>
//   );
// }

const Header = () => {
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate()
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Supernovas 🚀
          </Typography>
          <Button
            color="inherit"
            onClick={ () => navigate('/home')}
          >
            Home
          </Button>
          <Button
            color="inherit"
            onClick={ () => navigate('/projects')}
          >
            Proyectos
          </Button>
          <Button
            color="inherit"
            onClick={ () => navigate('/consultans')}
          >
            Consultores
          </Button>
          <Button
            color="inherit"
            onClick={async () => {
              await signOut();
            }}
          >
            Salir
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
