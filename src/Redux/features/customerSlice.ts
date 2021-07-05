import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

export interface CustomerState {
  _id: string;
  data: {
    firstName: String;
    lastName: String;
    email: String;
    phone: String;
    location: String;
    hobby: String;
  };
}

export interface InitialState {
  loading: boolean;
  error: boolean;
  data: null | Array<CustomerState>;
}

const initialState: InitialState = {
  loading: false,
  error: false,
  data: [],
};

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomers: (state, action: PayloadAction<CustomerState>) => {
      //@ts-ignore
      state.data = action.payload;
    },
    updateCustomer: (state, action: PayloadAction<CustomerState>) => {},
    deleteCustomer: (state, action: PayloadAction<{ id: string }>) => {},

    loadingIndicator: (state, action) => {
      state.loading = action.payload;
    },
    errorIndicator: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getCustomers,
  updateCustomer,
  deleteCustomer,
  loadingIndicator,
  errorIndicator,
} = customerSlice.actions;

//Thunks
export function createCustomerThunk(data: CustomerState) {
  return async (dispatch: any) => {
    try {
      dispatch(errorIndicator(false));
      dispatch(loadingIndicator(true));

      await axios.post(
        "https://crudcrud.com/api/08359a558a744313b6a4ff6fc839d1dc/customers",
        {
          data,
        }
      );

      dispatch(getCustomersThunk());
    } catch (err) {
      dispatch(errorIndicator(true));
      dispatch(loadingIndicator(false));
    }
  };
}

export function getCustomersThunk() {
  return async (dispatch: any) => {
    try {
      dispatch(errorIndicator(false));
      dispatch(loadingIndicator(true));

      const res: AxiosResponse<CustomerState> = await axios.get(
        "https://crudcrud.com/api/08359a558a744313b6a4ff6fc839d1dc/customers"
      );

      dispatch(getCustomers(res.data));
      dispatch(loadingIndicator(false));
    } catch (err) {
      dispatch(errorIndicator(true));
      dispatch(loadingIndicator(false));
    }
  };
}

//   export function updateCustomerThunk() {
//     return async (dispatch) => {

//     };
//   }

//   export function deleteCustomerThunk(){
//     return async (dispatch) => {

//     };
//   }

export default customerSlice.reducer;
