import {
  Button,
  makeStyles,
  createStyles,
  Theme,
  FormControl,
  Input,
  InputLabel,
  CircularProgress,
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CustomerState,
  InitialState,
  updateCustomerThunk,
} from "Redux/features/customerSlice";
import { RootState } from "Redux/store";

//Material UI styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: "yellow",
      marginRight: "10px",
      marginBottom: "10px",
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      display: "grid",
      gridTemplateColumns: "repeat(2,1fr)",
      gap: "10px",
    },
  })
);

//Component proper

export const EditCustomerButton = ({
  text,
  data,
}: {
  text: string;
  data: CustomerState;
}) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading, error } = useSelector<RootState, InitialState>(
    (state) => state.customer
  );

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    setFirstName(data.data.firstName);
    setLastName(data.data.lastName);
    setEmail(data.data.email);
    setPhone(data.data.phone);
    setHobby(data.data.hobby);
    setLocation(data.data.location);

    // eslint-disable-next-line
  }, []);

  //submit form
  const onSubmit = (e: any) => {
    e.preventDefault();

    let payload = {
      _id: data._id,
      data: {
        firstName,
        lastName,
        email,
        phone,
        hobby,
        location,
      },
    };
    dispatch(updateCustomerThunk(payload));

    setOpen(false);
  };

  //Modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant="contained"
        onClick={handleOpen}
      >
        {text}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <form className={classes.paper} onSubmit={onSubmit}>
            <FormControl>
              <div>
                <InputLabel htmlFor="first-name">First Name</InputLabel>
                <Input
                  id="first-name"
                  aria-describedby="First Name"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input
                  id="last-name"
                  aria-describedby="Last Name"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <br />
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input
                  id="email"
                  aria-describedby="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                <Input
                  id="phone"
                  aria-describedby="Phone number"
                  type="tel"
                  value={phone}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br />
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input
                  id="location"
                  aria-describedby="Location"
                  type="text"
                  value={location}
                  required
                  onChange={(e) => setLocation(e.target.value)}
                />
                <br />
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="hobby">Hobby</InputLabel>
                <Input
                  id="hobby"
                  aria-describedby="my-helper-text"
                  type="text"
                  value={hobby}
                  required
                  onChange={(e) => setHobby(e.target.value)}
                />
                <br />
              </div>
            </FormControl>
            {error && (
              <div className="error text-center">"An error occured"</div>
            )}
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              type="submit"
            >
              Update
            </Button>

            {loading && <CircularProgress />}
          </form>
        </Fade>
      </Modal>
    </div>
  );
};
