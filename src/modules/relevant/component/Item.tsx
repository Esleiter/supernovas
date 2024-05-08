import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

interface ItemProps {
    title: string;
    options: string[];
  }

const Item: React.FC<ItemProps> = ({ title, options }) => {
  const LabelSkill = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: 5,
    backgroundColor: "#dcebf3",
    borderRadius: 5,
    width: "80px",
  }));

  return (
    <Box sx={{ typography: "body1", marginTop: 2 }}>
      <Typography variant="body1" gutterBottom>
      {title}
      </Typography>
      <Card
        variant="outlined"
        style={{ padding: 5, display: "flex" }}
      >
         {options.map((option, index) => (
          <LabelSkill key={index}>{option}</LabelSkill>
        ))}
      </Card>
    </Box>
  );
};

export default Item;
