import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginRight: "10px",
  },
});

export const DownloadCsvButton = ({ text }: { text: string }) => {
  const classes = useStyles();

  return (
    <Button color="primary" className={classes.root} variant="contained">
      {text}
    </Button>
  );
};
