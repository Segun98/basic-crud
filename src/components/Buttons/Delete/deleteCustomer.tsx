import { Button } from "@material-ui/core";

export const DeleteCustomerButton = ({ text }: { text: string }) => {
  return (
    <Button color="secondary" variant="contained">
      {text}
    </Button>
  );
};
