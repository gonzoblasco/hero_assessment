import {useEffect, useRef, useState} from 'react';
import './DropDown.scss';
import chevron from '../../Assets/text-expand-arrow.svg';

const DropDown = props => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({value: false, msg: ''});

  const toggleDropDown = () => {
    setOpen(!open);
  };

  const handleSelect = value => {
    toggleDropDown(!open);
    props.onChange(props.name, value);
  };

  const handleValidation = value => {
    if (value.value === null) {
      setError({value: true, msg: 'This value is required.'});
    } else {
      setError({value: false, msg: ''});
    }
  };

  useEffect(() => {
    handleValidation(props.value);
    props.onChange(props.name, props.value);
  }, [props.value]);

  return (
      <div className="DropDown">
        <span className="Error">{ error.msg }</span>
        <label className="label">{ props.label }</label>
        <div className="SelectCointainer">
          <button
              className={ error.value ? 'SelectError' : 'Select' }
              ref={ ref }
              open={ open }
              error={ error }
              onClick={ () => toggleDropDown() }
          >
            <span className="TextValue">{ props.value.label }</span>
            <img src={ chevron } alt="Open DropDown"
                 className={ open ? 'imgOpen' : 'imgClosed' } />
          </button>
          { open && (
              <div className="OpenCointainer">
                { props.options.map((option, index) => (
                    <button
                        className="Option"
                        key={ index }
                        value={ option.value }
                        selected={ option.value === props.value.value }
                        onClick={ () => handleSelect(option) }
                    >
                      <p className="TextValue">{ option.label }</p>
                    </button>
                )) }
              </div>
          ) }
        </div>
      </div>
  );
};

export default DropDown;
