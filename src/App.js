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

// ==========================================
// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     const contactsInLocalStorage = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contactsInLocalStorage);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (nextContacts !== prevContacts) {
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }
//   }

//   addContact = ({ name, number }) => {
//     const foundNames = this.state.contacts.map(contact =>
//       contact.name.toLocaleLowerCase(),
//     );
//     const lowerName = name.toLocaleLowerCase();
//     if (foundNames.includes(lowerName)) {
//       return alert(`${name} is already in contacts`);
//     }
//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [contact, ...contacts],
//     }));
//   };

//   handleFilterReset = () => {
//     this.clearFilter();
//   };

//   clearFilter = () => {
//     this.setState({
//       filter: '',
//     });
//   };

//   changeFilter = event => {
//     this.setState({ filter: event.currentTarget.value });
//   };

//   render() {
//     const { contacts, filter } = this.state;

//     const filteredToLocaleLowerCase = filter.toLocaleLowerCase();
//     const contactsFiltered = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filteredToLocaleLowerCase),
//     );

//     return (
//       <div>
//         <GlobalStyle />
//         <h1>Phonebook</h1>
//         <Form onSubmit={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter
//           value={filter}
//           onChange={this.changeFilter}
//           onClick={this.handleFilterReset}
//         />
//         <Contacts
//           contacts={contactsFiltered}
//           onDeleteContact={this.deleteContact}
//         />
//       </div>
//     );
//   }
// }

// export default App;
