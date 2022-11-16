import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  addContact,
  deleteContact,
  fetchContacts,
} from './phoneBook.operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};
export const phoneBookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },

    delItem: (state, action) => {
      state.items = state.items.filter(it => it.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.fulfilled, (state, { payload }) => {
      state.contacts.items = payload;
    });
    builder.addCase(addContact.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.contacts.items.push(payload);
    });
    builder.addCase(deleteContact.fulfilled, (state, { payload }) => {
      state.contacts.items = state.contacts.items.filter(
        it => it.id !== payload.id
      );
    });
  },
});

const persistConfig = {
  key: 'react-07-phonebook',
  storage,
};

export const persistedPhoneBookReduser = persistReducer(
  persistConfig,
  phoneBookSlice.reducer
);
