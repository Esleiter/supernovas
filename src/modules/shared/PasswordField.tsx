import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  IconButton,
  InputAdornment,
  TextFieldProps,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";

const styleLabel = {
  "label + &": {
    marginTop: 3,
  },
};

interface CustomProps {
  inputLabel?: string;
}

type TextFieldCustom = TextFieldProps & CustomProps;

const PasswordField = ({ value, inputLabel, ...props }: TextFieldCustom) => {
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  useEffect(() => {
    if (value) setView(true);
    else setView(false);
  }, [value]);

  return (
    <FormControl variant="standard" fullWidth>
      {inputLabel && (
        <InputLabel shrink sx={{ fontSize: 20 }}>
          {inputLabel}
        </InputLabel>
      )}
      <TextField
        sx={styleLabel}
        {...props}
        value={value}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <>
              {view && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
            </>
          ),
        }}
      />
    </FormControl>
  );
};

export default PasswordField;
