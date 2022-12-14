import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm ';
import { Filter } from './Filter/Filter';
import { ListContacts } from './ListContacts/ListContacts';

import { PhoneBook } from './App.styled';

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

  addContact = newContact => {
    //ХОЧУ ЗНАТЬ ЧЕМ КОД В КОММЕНТАХ ЛУЧШЕ????? В НЕМ ЕСТЬ ТОЖЕ НЕДОСТАТКИ КАК И В МОЕМ. Я ВЫБИРАЮ СВОЙ ВАРИАНТ
    const { name, number } = newContact;
    //------------------- строка выше отсутствует
    if (this.state.contacts.some(el => el.name === name)) {
      // if (this.state.contacts.some(el => el.name === newContact.name))
      alert(`${name} is already in contacts`);
      // alert(`${newContact.name} is already in contacts`);
      return;
    }
    const id = nanoid(8);
    //------------------- строка выше отсутствует
    //newContact.id = nanoid(8); вы этого не предлагали, предлагали что то в что то распаковывать, но я сделяю вид что вы это предложили
    this.setState(state => {
      return { contacts: [...state.contacts, { id, name, number }] };
      //return { contacts: [...state.contacts, newContact}] };
    });
  };

  delContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(i => i.id !== id),
    }));
  };
  setFilter = event => this.setState({ filter: event.currentTarget.value });
  clearFilter = () => this.setState({ filter: '' });

  render() {
    const { contacts } = this.state;
    const normalizeFilter = this.state.filter.toLowerCase();
    const filtredContacts = contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeFilter)
    );

    return (
      <PhoneBook>
        <h1>Phonebook</h1>
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          onChange={this.setFilter}
          onClick={this.clearFilter}
        />
        <ListContacts
          filtredContacts={filtredContacts}
          delContact={this.delContact}
        />
      </PhoneBook>
    );
  }
}
