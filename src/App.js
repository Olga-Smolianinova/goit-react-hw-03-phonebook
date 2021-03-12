import React, { Component } from 'react';

import shortId from 'shortid'; //npm для создания уникальных ID

// Components
import ContactsForm from './components/ContactsForm';

import Filter from './components/Filter';

import ContactList from './components/ContactList';

// Data
import initialContacts from './components/ContactList/initialContacts.json'; //data for ContactList

class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  // чтобы при отравке (submit) формы получить доступ к state из ContactForm.js. Это можно сделать через props. В параметрах деструктуризуруем ключи name,number из state

  // во время submit ContactForm нужно получить из нее данные, чтобы добавить  еще один contacts с ее данными. Передаем этом метод с помощью prop для ContactsForm
  addContact = ({ name, number }) => {
    // console.log(name);
    // console.log(number);

    //проверка на возможность добавлять контакты, имена которых уже есть в телефонной книге. При попытке выполнить такое действие выводим alert с предупреждением.
    // console.log(this.state.contacts.id);
    // console.log(name);
    if (this.state.contacts.some(elm => elm.name === name)) {
      console.log(alert(`${name} is already in contacts`));
      return;
    }
    // создаем contact, и добавляем его в state
    const contact = {
      id: shortId.generate(), //присваиваем уникальный ID
      name,
      number,
    };

    // для обновления state, когда мы хотим в него что-либо добавить, сначала делаем новый массив, в который распыляем старый, и добавляем новый элемент в начало или конец массива [...старый[], элемент]
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  // для фильтрации. для передачи данныx при onChange
  changeFilter = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  // вычисляемые свойства для фильтрации. Отфильтровываем те contacts, которые includes то, что мы записали в input Фильтр по имени и в ContactList рендерим не все <ContactList
  //   contacts={contacts}, а только отфильтрованые, т.е.  contacts={filteredContacts}/>
  getFilteredContacts = () => {
    // для чистоты кода выведем this.state.filter.toLowerCase() в отдельную переменную
    const normalizedFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  // для удаления элемента в ContactList при onClick на кнопку. Обращаемся к id элемента.
  deleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId), //берем предыдущий contacts и отфильтровываем все элементы, кроме того у которого id совпадает
    }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className="App">
        <h1>Phonebook</h1>
        {/* ContactsForm чтобы при отравке (submit) формы получить доступ к state из Form.js добавляем prop onSubmit методом для этого */}

        <ContactsForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        {/* Filter */}
        <Filter value={this.state.filter} onChange={this.changeFilter} />

        {/* ContactList */}
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
