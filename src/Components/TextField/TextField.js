import {useEffect, useState} from 'react';
import './TextField.scss';

const validation = (validator, value) => {
  const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch (validator) {
    case "required":
      return value.length > 0 ? "" : "This value is required.";
    case "email":
      return emailRE.test(value) ? "" : "Please enter a valid email address.";
    default:
      return "";
  }
}

const classNamesField = {
  Field: "textField",
  Focus: "textFocus",
  Error: "textError",
}

const TextField = props => {
  const [value, setValue] = useState(props.value);
  const [errorMessage, setErrorMessage] = useState('')
}
