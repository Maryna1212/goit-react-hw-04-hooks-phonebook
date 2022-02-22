import { useState, useEffect } from 'react';
import useLocalStorage from './components/hooks/useLocalStorage';
import shortid from 'shortid';
import { GlobalStyle } from './components/GlobalStyles';
import Contacts from './components/Contacts/Contacts';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId),
    );
  };

  useEffect(() => {
    const contactsInLocalStorage = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsInLocalStorage);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, [setContacts]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const foundNames = contacts.map(contact =>
      contact.name.toLocaleLowerCase(),
    );
    const lowerName = name.toLocaleLowerCase();
    if (foundNames.includes(lowerName)) {
      return alert(`${name} is already in contacts`);
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(contacts => [contact, ...contacts]);
  };

  const handleFilterReset = () => {
    clearFilter();
  };

  const clearFilter = () => {
    setFilter('');
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const lowerCasedFilter = filter.toLocaleLowerCase();
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(lowerCasedFilter),
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div>
      <GlobalStyle />
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={changeFilter}
        onClick={handleFilterReset}
      />
      <Contacts contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
}
