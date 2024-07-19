import { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export class ContactForm extends Component {
  static propTypes = {
    addNewContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
  };

  state = {
    name: '',
    number: '',
  };

  //   Get the value of the Input Name and store it in state
  handleNameChange = e => {
    this.setState({
      name: e.target.value,
    });
    // console.log(this.state.name);
  };

  //   Get the value of the Input Number and store it in state
  handleNumberChange = e => {
    this.setState({
      number: e.target.value,
    });
    // console.log(this.state.name);
  };

  handleSubmit = e => {
    const { addNewContact, contacts } = this.props;
    const { name, number } = this.state;

    e.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      alert(`${name} is already in contacts!`);
      return;
    }

    // Function from the App that pass as Prop.
    addNewContact({
      id: nanoid(),
      name: name,
      number: number,
    });

    this.setState(prevState => ({
      name: '',
      number: '',
    }));
  };
  render() {
    const { name, number } = this.state;
    return (
      <div className={css.formContainer}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <label>
            <p>Name</p>
            <input
              type="text"
              name="name"
              // add \ before - in [' \-] to make it work (LMS)
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
              required
              value={name}
              onChange={this.handleNameChange}
            />
          </label>
          <label>
            <p>Telephone</p>
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleNumberChange}
            />
          </label>
          <button className={css.btn} type="submit">
            Add Contact
          </button>
        </form>
      </div>
    );
  }
}
