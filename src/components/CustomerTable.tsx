import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { EditCustomerButton } from "./Buttons/Edit/editCustomer";
import { DeleteCustomerButton } from "./Buttons/Delete/deleteCustomer";
import { DownloadCsvButton } from "./Buttons/Download/downloadCsv";
import { AddCustomerButton } from "./Buttons/Add/addCustomer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCustomersThunk, InitialState } from "Redux/features/customerSlice";
import { RootState } from "Redux/store";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  buttons: {
    marginRight: "10px",
  },
});

export const CustomerTable = () => {
  const classes = useStyles();

  //redux store
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomersThunk());
  }, [dispatch]);

  const { loading, error, data } = useSelector<RootState, InitialState>(
    (state) => state.customer
  );

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customer table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">First</TableCell>
              <TableCell align="left">Last</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Hobby</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && !error && (
              <div className="text-center">
                <CircularProgress />
              </div>
            )}
            {data &&
              data.length > 0 &&
              data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.data.firstName}
                  </TableCell>
                  <TableCell align="left">{row.data.lastName}</TableCell>
                  <TableCell align="left">{row.data.email}</TableCell>
                  <TableCell align="left">{row.data.phone}</TableCell>
                  <TableCell align="left">{row.data.location}</TableCell>
                  <TableCell align="left">{row.data.hobby}</TableCell>
                  <TableCell align="left">
                    <EditCustomerButton text="Edit" />
                    <DeleteCustomerButton text="Del" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <section className="download-add-btns">
        <DownloadCsvButton text="Download CSV" />
        <AddCustomerButton text="Add Customer" />
      </section>
    </div>
  );
};
