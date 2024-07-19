import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    // checks if parsedContacts is not null. If it is not null, this means there were contacts stored in localStorage
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Get the New contact from ContactForm and store it in State
  addNewContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  handleFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  setFilter = filterValue => {
    this.setState({
      filter: filterValue,
    });
  };

  filterContact = () => {
    const { contacts, filter } = this.state;
    const filterLowerCase = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );
  };

  render() {
    const { contacts, filter } = this.state;

    return (
      <>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm addNewContact={this.addNewContact} contacts={contacts} />
        </div>
        <div className={css.containerContacts}>
          <h2>Contacts</h2>
          <Filter filter={filter} setFilter={this.setFilter} />
          <ContactList
            filterContact={this.filterContact}
            deleteContact={this.deleteContact}
          />
        </div>
      </>
    );
  }
}
