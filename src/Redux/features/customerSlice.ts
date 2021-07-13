import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

const baseUrl = "https://crudcrud.com/api/e4af12cb04c14a21b93f291628171c2f";
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
