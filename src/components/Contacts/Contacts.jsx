import PropTypes from 'prop-types';
import { ContactList, ContactItem, ContactText } from './Contacts.styled';

const Contacts = ({ contacts, onDeleteContact }) => (
  <ContactList>
    {contacts.map(({ id, name, number }) => (
      <ContactItem key={id}>
        <ContactText>
          {name}: {number}
        </ContactText>
        <button onClick={() => onDeleteContact(id)}>Delete</button>
      </ContactItem>
    ))}
  </ContactList>
);

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
