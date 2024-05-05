import { Button, ButtonProps, CircularProgress } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'

interface CustomProps {
  isLoading: boolean
  icon?: JSX.Element | 'nope'
}

type ButtonSubmitProps = ButtonProps & CustomProps

export const ButtonSubmit = ({
  isLoading,
  icon,
  sx,
  children,
  ...propsButton
}: ButtonSubmitProps) => {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          boxShadow: 'none',
          ...sx
        }}
        startIcon={
          isLoading ? (
            <CircularProgress size={20} />
          ) : icon === 'nope' ? (
            ''
          ) : (
            icon ?? <SaveIcon fontSize="small" />
          )
        }
        {...propsButton}
      >
        {children ?? 'Save'}
      </Button>
    </>
  )
}
