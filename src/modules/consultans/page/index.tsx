import {
  Avatar,
  Chip,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useGetData } from "../../../services/useSaveData";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Consultans = () => {
  const { data } = useGetData("consultant");
  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Localidad</StyledTableCell>
              <StyledTableCell align="center">Habilidades</StyledTableCell>
              <StyledTableCell>Educación</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Avatar
                      alt="Remy Sharp"
                      src={row?.personal_data?.profileImage}
                    />
                    <Typography>{row?.personal_data?.name}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row?.personal_data?.location}
                </StyledTableCell>
                <StyledTableCell width={5}>
                  {row?.skills?.map((skill, index) => (
                    <Chip
                      color="primary"
                      sx={{ marginRight: 1, marginTop: 1 }}
                      label={skill}
                      size="small"
                      key={`${skill}-${index}`}
                    />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row?.education?.map((item, index) => (
                    <div key={`${item?.institution}-${index}`}>
                      <Typography variant="subtitle2">
                        {item?.institution}
                      </Typography>
                      <Typography variant="caption">{item?.degree}</Typography>
                    </div>
                  ))}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default Consultans;
