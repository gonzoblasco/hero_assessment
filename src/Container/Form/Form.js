import {useState} from 'react';
import './Form.scss';
import API_CALLS from '../../Utils/apiCalls';
import CheckBox from '../../Components/CheckBox/CheckBox';
import DropDown from '../../Components/DropDown/DropDown';
import TextField from '../../Components/TextField/TextField';
import {ACTIONS} from '../../Utils/actions';
import {useStore} from '../../Utils/store';

const fields = {
  ADVANCES: 'advances',
  ALERTS: 'alerts',
  EMAIL: 'email',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  ORGANIZATION: 'organization',
  OTHERS: 'others',
  RESIDENT: 'resident',
};

const config = [
  {
    field: fields.ADVANCES,
    required: true,
    type: 'boolean',
  },
  {
    field: fields.ALERTS,
    required: true,
    type: 'boolean',
  },
  {
    field: fields.EMAIL,
    required: true,
    type: 'text',
  },
  {
    field: fields.FIRST_NAME,
    requierd: true,
    type: 'text',
  },
  {
    field: fields.LAST_NAME,
    required: true,
    type: 'text',
  },
  {
    field: fields.ORGANIZATION,
    required: true,
    type: 'text',
  },
  {
    field: fields.RESIDENT,
    required: true,
    type: 'objBoolean',
  },
];

const emailValidations = ['required', 'email'];

const resetForm = {
  advances: true,
  alerts: true,
  email: '',
  firstName: '',
  lastName: '',
  organization: '',
  others: false,
  resident: {value: undefined, label: '- SELECT ONE -'},
};

const residentOptions = [
  {
    value: true,
    label: 'YES',
  },
  {
    value: false,
    label: 'NO',
  },
];

const url = 'https://urlbackendservices.com/api/formPost';

const validations = ['required'];

const Form = () => {
  const {state, dispatch} = useStore();
  const [formValue, setFormValue] = useState(resetForm);
  const [errorFields, setErrorFields] = useState([]);

  const handleChange = (name, value) => setFormValue(
      {...formValue, [name]: value},
  );

  const handlePost = async (values) => {
    dispatch({type: ACTIONS.POSTING});
    const payload = await API_CALLS.POST_FORM(url, values);
    dispatch(payload);
  };

  const handleReset = () => setFormValue(resetForm);

  const handleSubmit = () => {
    if (validateForm(formValue, config)) {
      console.log('CALL TO API');
      console.log(formValue);
    }
  };

  const validateForm = (form, config) => {
    let forceFailForm = {};
    let isValid = true;

    config.forEach(item => {
      if (item.required) {
        if (form[item.field] === '' && item.type === 'text') {
          forceFailForm[item.field] = null;
          isValid = false;
        }

        if (item.type === 'boolean') {
          forceFailForm[item.field] = form[item.field]
              ? form[item.field]
              : false;
          isValid = form[item.field]
              ? form[item.field]
              : false;
        }

        if (item.type === 'objBoolean') {
          if (form[item.field].value === undefined) {
            forceFailForm[item.field] = {
              value: null,
              label: '- SELECT ONE -',
            };
            isValid = false;
          } else {
            forceFailForm[item.field] = form[item.field];
          }
        }
      }
    });

    if (Object.keys(forceFailForm).length > 0) {
      setFormValue({...forceFailForm});
    }

    return isValid;
  };

  return (
      <div className="page">
        <form className="form">
          <TextField
              label="First Name"
              name={ fields.FIRST_NAME }
              onChange={ handleChange }
              validations={ validations }
              value={ formValue.firstName }
          />
          <TextField
              label="Last Name"
              name={ fields.LAST_NAME }
              onChange={ handleChange }
              validations={ validations }
              value={ formValue.lastName }
          />
          <TextField
              label="Email Address"
              name={ fields.EMAIL }
              onChange={ handleChange }
              validations={ emailValidations }
              value={ formValue.email }
          />
          <TextField
              label="Organization"
              name={ fields.ORGANIZATION }
              onChange={ handleChange }
              validations={ validations }
              value={ formValue.organization }
          />
          <DropDown
              label="US Resident"
              name={ fields.RESIDENT }
              onChange={ handleChange }
              options={ residentOptions }
              validations={ validations }
              value={
                formValue.resident
                    ? formValue.resident
                    : {
                      value: undefined,
                      label: '- SELECT ONE -',
                    }
              }
          />
          <div />
          <CheckBox
              label="Advances"
              name={ fields.ADVANCES }
              onChange={ handleChange }
              required={ true }
              value={ formValue.advances }
          />
          <CheckBox
              label="Alerts"
              name={fields.ALERTS}
              onChange={handleChange}
              required={true}
              value={formValue.alerts}
          />
          <CheckBox
              label="Other Comunications"
              name={fields.OTHERS}
              onChange={handleChange}
              required={false}
              value={formValue.others}
          />
        </form>
        <div className="buttonSection">
          <button className="btnSubmit" onClick={handleSubmit}>SUBMIT</button>
          <button className="btnReset" onClick={handleReset}>RESET</button>
        </div>
      </div>
  );
};

export default Form;
