import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { setUser } from "../slice/authSlice";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ButtonSubmit } from "../shared/ButtonSubmit";
import PasswordField from "../shared/PasswordField";
import { styled } from "@mui/system";
import { useAppDispatch } from "../../store/useRedux";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useEffect } from "react";
import imageLogin from "../../assets/login.jpg";

const ContainerWrapper = styled("div")(() => ({
  height: "100vh",
  width: "100vw",
}));

const ContainerForm = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}));

const StyledImage = styled("img")(() => ({
  height: "100%",
}));

const Login = () => {
  const dispatch = useAppDispatch();
  const [signInWithEmailAndPassword, user, loading] =
    useSignInWithEmailAndPassword(auth);
  const { handleSubmit, handleChange, values, touched, errors, setFieldValue } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      //   validationSchema: loginSchema,
      onSubmit: async ({ email, password }) => {
        await signInWithEmailAndPassword(email, password);
      },
    });

  useEffect(() => {
    if(user) dispatch(setUser(user));
  }, [user, dispatch]);

  return (
    <ContainerWrapper>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <ContainerForm>
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Typography
                variant="h3"
                component="h3"
                padding={2}
                align="center"
              >
                Ingrese
              </Typography>
              <Grid container gap={3}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  size="small"
                  fullWidth
                  required
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    endAdornment: (
                      <>
                        {values?.email && (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setFieldValue("email", "")}
                              edge="end"
                            >
                              {<HighlightOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )}
                      </>
                    ),
                  }}
                />
                <Grid container item justifyContent="flex-end" width={"100%"}>
                  <PasswordField
                    id="password"
                    name="password"
                    placeholder="Password"
                    size="small"
                    fullWidth
                    required
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <ButtonSubmit isLoading={loading} icon="nope" fullWidth>
                  Iniciar sesión
                </ButtonSubmit>
              </Grid>
            </Box>
          </ContainerForm>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StyledImage
            src={imageLogin}
            alt="Background"
          />
        </Grid>
      </Grid>
    </ContainerWrapper>
  );
};

export default Login;
