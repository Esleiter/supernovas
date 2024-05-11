import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  IconButtonProps,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetByIdConsultant,
} from "../../../services/useSaveData";
import { ConsultansInterface } from "../../interface/types";
import { Match } from ".";
import Item from "../../home/Item";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

type Props = { match: Match };

const ItemDetail = ({ match }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const { refs } = useGetByIdConsultant("consultant");
  const [consultant, setConsultant] = useState<ConsultansInterface>();

  useEffect(() => {
    const matchData = async () => {
      const resp = await refs();

      resp.forEach((item) => {
        if (item.id === match.consultantId)
          setConsultant(item.data() as ConsultansInterface);
      });
    };
    matchData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid item>
      <Card>
        <CardContent>
          <Grid container>
            <Avatar
              alt="Remy Sharp"
              src={consultant?.personal_data?.profileImage}
            />
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ paddingLeft: 2 }}
            >
              Score: {match?.score}
            </Typography>
            <Grid item paddingLeft={2} paddingTop={2}>
              <Typography variant="body2" color="text.secondary">
                {match?.justifyResume}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="subtitle2">Educacion:</Typography>
            <Typography variant="subtitle1">
              {consultant?.education[0]?.degree}
            </Typography>
            <Typography variant="subtitle1">
              {consultant?.education[0]?.institution}
            </Typography>
            <Item title="Skills" options={consultant?.skills} />
            <Item title="Intereses" options={consultant?.interests} />
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ItemDetail;
