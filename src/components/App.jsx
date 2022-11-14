import Section from './Section/Section';
import Form from './Form/Form';
import SearchForm from './SearchForm/SearchForm';
import ContactList from './ContactList/ContactList';
import s from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/phoneBook.operations';
import { getContacts } from 'redux/selectors';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(state => state.filter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    return contacts?.filter(it => it.name.toLowerCase().includes(filter));
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={s.container}>
      <Section title="Phone Book">
        <Form />
      </Section>

      <Section title="Contacts">
        <SearchForm />
        {filteredContacts && <ContactList contacts={filteredContacts} />}
      </Section>
    </div>
  );
}
