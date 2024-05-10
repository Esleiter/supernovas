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
import { ConsultansInterface } from "../../interface/types";
import { ResponseProjects } from "../interface";
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

type Projects = { id: string} & ResponseProjects

const DetailProject = () => {
  const { data } = useGetData<Projects>("projects");
  console.log(data)

  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Localidad</StyledTableCell>
              <StyledTableCell align="center">Habilidades</StyledTableCell>
              <StyledTableCell align="center">Presupuesto</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row?.id}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Typography>{row?.client?.name}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.client?.location?.city}
                </StyledTableCell>
                <StyledTableCell width={5}>
                  {row?.developer?.skills?.map((skill, index) => (
                    <Chip
                      color="primary"
                      sx={{ marginRight: 1, marginTop: 1 }}
                      label={skill}
                      size="small"
                      key={`${skill}-${index}`}
                    />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row?.budget}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default DetailProject;
