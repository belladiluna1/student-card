import React, { useEffect, useState } from 'react';
import TextField from '../components/TextField';
import { validator } from '../utils/validator';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FormWithValidator = ({ data, setData, create }) => {
  const [errors, setErrors] = useState({});
  const [data_, setData_] = useState(data);
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData_((prevState) => ({ ...prevState, [target.name]: { ...prevState[target.name], value: target.value } }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Поле Имя обязательно для заполнения'
      }
    },
    lastname: {
      isRequired: {
        message: 'Поле Фамилия обязательно для заполнения'
      }
    },
    year: {
      isRequired: {
        message: 'Поле Год рождения обязательно для заполнения'
      },
      min: {
        message: 'Поле Год введено некорректно',
        value: 4
      },
      maxValue: {
        message: 'Поле Год введено некорректно',
        value: new Date().getFullYear()
      }
    },
    portfolio: {
      isRequired: {
        message: 'Поле Портфолио обязательно для заполнения'
      },
      isLink: {
        message: 'Поле Портфолио должно быть ссылкой'
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data_]);

  const validate = () => {
    const errors = validator(data_, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    setData(data_);
    localStorage.setItem('student', JSON.stringify(data_));
    alert('Обновлено');
    navigate('/');
  };

  return <form onSubmit={handleSubmit}>
    {Object.keys(data_).map((item, index) => <TextField key={index} type={data_[item].type || undefined} label={data_[item].label} value={data_[item].value} name={item} onChange={handleChange} error={errors[item]} />)}

    {create && <p><button type='submit' disabled={!isValid} className='btn btn-primary mx-auto'>
      Создать
      </button></p>}
    {!create && <p>
      <span className='btn btn-secondary mx-auto'>
        <Link to='/'>Назад</Link>
      </span>
      <button type='submit' disabled={!isValid} className='btn btn-primary ms-3'>
        Обновить
      </button>
      </p>}
  </form>;
};

FormWithValidator.defaultProps = {
  create: true
};

FormWithValidator.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  create: PropTypes.bool
}

export default FormWithValidator;


