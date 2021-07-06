import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const baseUrl = "https://crudcrud.com/api/638e778d64794cbeb0d9820e76389912";
// const baseUrl = "";
export interface CustomerState {
  _id: string;
  data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    hobby: string;
  };
}

export interface InitialState {
  loading: boolean;
  error: boolean;
  success: boolean;
  data: null | Array<CustomerState>;
}

const initialState: InitialState = {
  loading: false,
  error: false,
  success: false,
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
    successIndicator: (state) => {
      state.success = true;
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
  successIndicator,
} = customerSlice.actions;

//Thunks
export function createCustomerThunk(data: CustomerState) {
  return async (dispatch: any) => {
    try {
      dispatch(errorIndicator(false));
      dispatch(loadingIndicator(true));

      await axios.post(`${baseUrl}/customers`, {
        data,
      });

      dispatch(successIndicator());
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
        `${baseUrl}/customers`
      );

      dispatch(getCustomers(res.data));
      dispatch(loadingIndicator(false));
    } catch (err) {
      dispatch(errorIndicator(true));
      dispatch(loadingIndicator(false));
    }
  };
}

export function updateCustomerThunk(data: CustomerState) {
  return async (dispatch: any) => {
    try {
      dispatch(errorIndicator(false));
      dispatch(loadingIndicator(true));

      await axios.put(`${baseUrl}/customers/${data._id}`, {
        // _id: data._id,
        data: {
          ...data.data,
        },
      });

      dispatch(successIndicator());
      dispatch(getCustomersThunk());
    } catch (err) {
      dispatch(errorIndicator(true));
      dispatch(loadingIndicator(false));
    }
  };
}

export function deleteCustomerThunk(id: string) {
  return async (dispatch: any) => {
    try {
      dispatch(errorIndicator(false));
      dispatch(loadingIndicator(true));

      await axios.delete(`${baseUrl}/customers/${id}`);

      dispatch(successIndicator());
      dispatch(getCustomersThunk());
    } catch (err) {
      dispatch(errorIndicator(true));
      dispatch(loadingIndicator(false));
    }
  };
}

export default customerSlice.reducer;
