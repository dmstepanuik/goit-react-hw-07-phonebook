import PT from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteContact } from 'redux/phoneBook.operations';

import s from './ContactItem.module.css';
export default function ContactItem({ id, name, phone }) {
  const dispatch = useDispatch();
  return (
    <li>
      {name}: {phone}{' '}
      <button className={s.btn} onClick={() => dispatch(deleteContact(id))}>
        Delete
      </button>
    </li>
  );
}
ContactItem.propTypes = {
  id: PT.string.isRequired,
  name: PT.string.isRequired,
  phone: PT.string.isRequired,
};
