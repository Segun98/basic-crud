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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createCustomerThunk,
  InitialState,
} from "Redux/features/customerSlice";
import { RootState } from "Redux/store";

//Material UI styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      background: "green",
      color: "white",
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

export const AddCustomerButton = ({ text }: { text: string }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const { loading, error } = useSelector<RootState, InitialState>(
    (state) => state.customer
  );

  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //submit form
  const onSubmit = (data: any) => {
    dispatch(createCustomerThunk(data));
    reset();
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
          <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <div>
                <InputLabel htmlFor="first-name">First Name</InputLabel>
                <Input
                  id="first-name"
                  aria-describedby="First Name"
                  type="text"
                  {...register("firstName", { required: true, maxLength: 20 })}
                />
                <br />
                <div className="error">
                  {errors.firstName &&
                    "First name is required and must not exceed 20 characters"}
                </div>
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="last-name">Last Name</InputLabel>
                <Input
                  id="last-name"
                  aria-describedby="Last Name"
                  type="text"
                  {...register("lastName", { required: true, maxLength: 20 })}
                />
                <br />
                <div className="error">
                  {errors.lastName &&
                    "Last name is required and must not exceed 20 characters"}
                </div>
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
                  {...register("email", { required: true })}
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
                  {...register("phone", { required: true, maxLength: 20 })}
                />
                <br />
                <div className="error">
                  {errors.phone &&
                    "Phone Number is required and must not exceed 20 characters"}
                </div>
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Input
                  id="location"
                  aria-describedby="Location"
                  type="text"
                  {...register("location", { required: true, maxLength: 20 })}
                />
                <br />
                <div className="error">
                  {errors.location &&
                    "Location is required and must not exceed 20 characters"}
                </div>
              </div>
            </FormControl>

            <FormControl>
              <div>
                <InputLabel htmlFor="hobby">Hobby</InputLabel>
                <Input
                  id="hobby"
                  aria-describedby="my-helper-text"
                  type="text"
                  {...register("hobby", { required: true, maxLength: 20 })}
                />
                <br />
                <div className="error">
                  {errors.hobby &&
                    "Your hobby is required and must not exceed 20 characters"}
                </div>
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
              Add Customer
            </Button>

            {loading && <CircularProgress />}
          </form>
        </Fade>
      </Modal>
    </div>
  );
};
