import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// https://6368f5b028cd16bba710fa23.mockapi.io/api/v1/contacts
const contactsAxios = axios.create({
  baseURL: 'https://6368f5b028cd16bba710fa23.mockapi.io/api/v1',
});
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const { data } = await contactsAxios.get('/contacts');
  return data;
});
