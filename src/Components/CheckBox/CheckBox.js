import {useEffect, useState} from 'react';
import './CheckBox.scss';
import checkmark from '../../Assets/check.svg';

const CheckBox = props => {
  const [checked, setChecked] = useState(props.value);
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState(false);

  const handleValidation = value => {
    if (!props.required || (props.required && value)) {
      setError(false);
      setErrorMessage('');
    } else if (props.required) {
      setError(true);
      setErrorMessage('This value is required');
    }
  };

  const handleClick = () => {
    setChecked(!checked);
    handleValidation(!checked);
    props.onChange(props.name, !checked);
  };

  useEffect(() => {
    handleValidation(props.value);
    setChecked(props.value);
  }, [props.value]);

  return (
      <div className="checkBox">
        <div className="error">
          { error && <span>{ errorMessage }</span> }
        </div>
        <button className="box" onClick={ handleClick }>
          <div className={ checked ? 'checked' : error
              ? 'errorCheck'
              : 'unchecked' }>
            { checked &&
            <img src={ checkmark } alt="checkbox" className="imgCheck" /> }
          </div>
          <label className="label">{ props.label }</label>
        </button>
      </div>
  );
};

export default CheckBox;
