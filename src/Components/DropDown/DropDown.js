import {useEffect, useRef, useState} from 'react';
import './DropDown.scss';
import chevron from '../../Assets/text-expand-arrow.svg';

const DropDown = ({label, name, onChange, options, value}) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({value: false, msg: ''});

  const toggleDropDown = () => {
    setOpen(!open);
  };

  const handleSelect = value => {
    toggleDropDown(!open);
    onChange(name, value);
  };

  const handleValidation = value => {
    if (value.value === null) {
      setError({value: true, msg: 'This value is required.'});
    } else {
      setError({value: false, msg: ''});
    }
  };

  useEffect(() => {
    handleValidation(value);
    onChange(name, value);
  }, [value]);

  return (
      <div className="DropDown">
        <span className="Error">{ error.msg }</span>
        <label className="label">{ label }</label>
        <div className="SelectContainer">
          <div
              className={ error.value ? 'SelectError' : 'Select' }
              ref={ ref }
              open={ open }
              error={ error }
              onClick={ toggleDropDown }
          >
            <span className="TextValue">{ value.label }</span>
            <img src={ chevron } alt="Open DropDown"
                 className={ open ? 'imgOpen' : 'imgClosed' } />
          </div>
          { open && (
              <div className="OpenCointainer">
                { options.map((option, index) => (
                    <div
                        className="Option"
                        key={ index }
                        value={ option.value }
                        selected={ option.value === value.value }
                        onClick={ () => handleSelect(option) }
                    >
                      <p className="TextValue">{ option.label }</p>
                    </div>
                )) }
              </div>
          ) }
        </div>
      </div>
  );
};

export default DropDown;
