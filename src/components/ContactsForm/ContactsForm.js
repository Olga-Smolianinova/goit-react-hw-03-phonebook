import React, { Component } from 'react';

import PropTypes from 'prop-types';

import s from './ContactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  //ввод данных
  handleChange = event => {
    // console.log(event.currentTarget.value);

    const { name, value } = event.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  // для отправки (submit) формы
  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);

    //   во время отправки (submit) формы обращаемся к prop onSubmit={this.addContact} для передачи данных из  state (name, number) в App
    this.props.onSubmit(this.state);

    // вызов reset для очистки  данных формы,
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={s.form}>
        <label>
          Name
          <input
            className={s.inputName}
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </label>

        <label>
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
          />
        </label>

        <button
          type="submit"
          disabled={!this.state.name || !this.state.number}
          className={s.formBtn}
        >
          Add Contact
        </button>
      </form>
    );
  }
}

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactsForm;
