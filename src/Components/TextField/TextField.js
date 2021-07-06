import {useEffect, useState} from 'react';
import style from './TextField.scss';

const validation = (validator, value) => {
  const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch (validator) {
    case 'required':
      return value.length > 0 ? '' : 'This value is required.';
    case 'email':
      return emailRE.test(value) ? '' : 'Please enter a valid email address.';
    default:
      return '';
  }
};

const classNamesField = {
  Field: style.textField,
  Focus: style.textFocus,
  Error: style.textError,
};

const TextField = props => {
  const [value, setValue] = useState(props.value);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTouchedOnce, setTouchedOnce] = useState(null);
  const [isBlurred, setBlurred] = useState(false);
  const [classInput, setClassInput] = useState(classNamesField.Field);

  const runValitations = value => {
    if (!isTouchedOnce) return;

    let validationRes;

    for (let i = 0; i < props.validations.length; i++) {
      const validator = props.validations[i];

      if (typeof validator === 'string') {
        validationRes = validation(validator, value);

        if (validationRes.length > 1) {
          setErrorMessage(validationRes);
          setClassInput(classNamesField.Error);
        } else {
          setErrorMessage('');
          setClassInput(classNamesField.Field);
        }

        if (validationRes) break;
      }
    }
  };

  const handleChange = (name, currentValue) => {
    setValue(currentValue);
    runValitations(currentValue);
    props.onChange(name, currentValue);
  };

  const onFocus = () => {
    setTouchedOnce(true);
    setClassInput(classNamesField.Focus);
    setBlurred(false);
  };

  const onBlur = event => {
    const {name} = event.target;
    const currentValue = event.target.value;

    runValitations(currentValue);
    setBlurred(true);

    if (errorMessage.length > 0) {
      setClassInput(classNamesField.Error);
    } else {
      setClassInput(classNamesField.Field);
    }

    props.onChange(name, currentValue);
  };

  useEffect(() => {
    if (props.value === null) {
      setErrorMessage('This value is required.');
      setClassInput(classNamesField.Error);
    }

    if (props.value === '') {
      setErrorMessage('');
      setValue('');
      setClassInput(classNamesField.Field);
    }
  }, [props.value]);

  const shouldDisplayError = errorMessage || (isTouchedOnce && isBlurred);

  return (
      <div key={ props.name } className={ style.formField }>
        <div className={ style.errorSection }>
          { shouldDisplayError &&
          <span className={ style.errorMessage }>{ errorMessage }</span> }
        </div>
        <div className={ style.labelSection }>
          <label>{ props.label }</label>
        </div>
        <input
            className={ classInput }
            name={ props.name }
            onBlur={ onBlur }
            onChange={ e => handleChange(props.name, e.target.value) }
            onFocus={ onFocus }
            placeholder={ props.placeholder }
            type={ props.type || 'text' }
            value={ value }
        />
      </div>
  );
};

export default TextField;
