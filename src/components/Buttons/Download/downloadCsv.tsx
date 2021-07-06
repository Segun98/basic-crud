import { Button, makeStyles } from "@material-ui/core";
import { CustomerState } from "Redux/features/customerSlice";
import { CSVLink } from "react-csv";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  root: {
    marginRight: "10px",
  },
});

export const DownloadCsvButton = ({
  text,
  data,
}: {
  text: string;
  data: CustomerState[] | null;
}) => {
  const classes = useStyles();

  const [csvData, setCsvData] = useState<any>([]);

  useEffect(() => {
    setCsvData(data);
  }, [data]);

  function reableArray() {
    return csvData.map((c: any) => c.data);
  }

  return (
    <Button color="primary" className={classes.root} variant="contained">
      <CSVLink
        data={reableArray()}
        style={{ color: "white", textDecoration: "none" }}
      >
        {text}
      </CSVLink>
    </Button>
  );
};
