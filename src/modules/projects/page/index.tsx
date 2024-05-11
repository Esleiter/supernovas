import {
  Chip,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useGetData } from "../../../services/useSaveData";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { useNavigate } from "react-router-dom";
import { ResponseIA } from "../../interface/types";

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

type Projects = { id: string } & ResponseIA;

const DetailProject = () => {
  const { data } = useGetData<Projects>("projects");
  const navigate = useNavigate();
  const handleReview = (id: string) => {
    navigate(`/projects/${id}`);
  };
  console.log(data);

  return (
    <Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nombre</StyledTableCell>
              <StyledTableCell>Localidad</StyledTableCell>
              <StyledTableCell align="center">Tecnologías</StyledTableCell>
              <StyledTableCell align="center">Presupuesto</StyledTableCell>
              <StyledTableCell align="center">Acción</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row?.id}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="row" spacing={2}>
                    <Typography>{row?.client?.name ?? row?.client?.industry ?? 'Sin info'}</Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {row?.client?.location?.city}
                </StyledTableCell>
                <StyledTableCell width={5}>
                  {row?.scope?.map((skill, index) => (
                    <Chip
                      color="primary"
                      sx={{ marginRight: 1, marginTop: 1 }}
                      label={skill}
                      size="small"
                      key={`${skill}-${index}`}
                    />
                  ))}
                </StyledTableCell>
                <StyledTableCell align="center">{row?.budget}</StyledTableCell>
                <StyledTableCell align="center">
                  <Tooltip title="Revisar proyecto" arrow>
                    <IconButton
                      color="warning"
                      size="small"
                      onClick={() => handleReview(row?.id)}
                    >
                      <DocumentScannerIcon fontSize="small" color="primary"/>
                    </IconButton>
                  </Tooltip>
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
