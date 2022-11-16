import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/phoneBook.operations';
// import { phoneBookSlice } from 'redux/phoneBook.slice';
import s from './Form.module.css';

export default function Form() {
  const dispatch = useDispatch();
  // const getContacts = state => state.contacts.items;
  const contacts = useSelector(state => state.contacts.items);
  // console.log(contacts);
  const getIsExistContact = contact =>
    contacts.some(it => it.name === contact.name);

  const onSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const contact = {
      id: nanoid(4),
      name: form.elements.name.value,
      number: form.elements.number.value,
    };

    if (getIsExistContact(contact)) {
      alert(`${contact.name} is alredy in contacts`);
      return;
    }
    dispatch(addContact(contact));

    form.reset();
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div>
        <label className={s.label}>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
      </div>
      <div>
        <label className={s.label}>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </div>
      <button className={s.btn} type="submit">
        Add contact
      </button>
    </form>
  );
}
