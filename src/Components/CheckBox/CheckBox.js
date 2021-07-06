import {useEffect, useState} from 'react';
import './CheckBox.scss';
import checkmark from '../../Assets/check.svg';

const CheckBox = ({label, name, onChange, required, value}) => {
  const [checked, setChecked] = useState(value);
  const [errorMessage, setErrorMessage] = useState();
  const [error, setError] = useState(false);

  const handleValidation = value => {
    if (!required || (required && value)) {
      setError(false);
      setErrorMessage('');
    } else if (required) {
      setError(true);
      setErrorMessage('This value is required');
    }
  };

  const handleClick = () => {
    setChecked(!checked);
    handleValidation(!checked);
    onChange(name, !checked);
  };

  useEffect(() => {
    handleValidation(value);
    setChecked(value);
  }, [value]);

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
          <label className="label">{ label }</label>
        </button>
      </div>
  );
};

export default CheckBox;
