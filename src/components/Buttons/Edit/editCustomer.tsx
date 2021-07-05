import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "yellow",
    marginRight: "10px",
  },
});

export const EditCustomerButton = ({ text }: { text: string }) => {
  const classes = useStyles();

  return (
    <Button className={classes.root} variant="contained">
      {text}
    </Button>
  );
};
