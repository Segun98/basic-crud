import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomerThunk,
  InitialState,
} from "Redux/features/customerSlice";
import { RootState } from "Redux/store";

export const DeleteCustomerButton = ({
  text,
  id,
}: {
  text: string;
  id: string;
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector<RootState, InitialState>(
    (state) => state.customer
  );

  const handleDelete = () => {
    dispatch(deleteCustomerThunk(id));
  };
  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={handleDelete}
      disabled={loading}
    >
      {text}
    </Button>
  );
};
