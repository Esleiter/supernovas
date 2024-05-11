import { Box, Card, Grid, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";

interface ItemProps {
    title: string;
    options?: string[];
  }

const Item: React.FC<ItemProps> = ({ title, options }) => {
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography gutterBottom variant="body2">
      {title}
      </Typography>
      <Card
        variant="outlined"
        style={{ padding: 5 }}
      >
        <Grid container spacing={1}>
        {options?.map((option, index) => (
          <Grid item key={index}>
            <Chip color="default" label={option} size="medium" />
          </Grid>
        ))}
      </Grid>
      </Card>
    </Box>
  );
};

export default Item;
