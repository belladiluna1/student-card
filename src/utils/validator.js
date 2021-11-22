export function validator(data, config) {
  const errors = {};
  let statusValidate;
  function validate(validateMethod, dataItem, config) {
    switch (validateMethod) {
      case 'isRequired':
        statusValidate = dataItem.value.trim() === '';
        break;
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(dataItem.value);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(dataItem.value);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(dataItem.value);
        break;
      }
      case 'min': {
        statusValidate = dataItem.value.length < config.value;
        break;
      }
      case 'maxValue': {
        statusValidate = Number(dataItem.value) > config.value;
        break;
      }
      case 'isLink': {
        const linkRegExp = /https:\/\/.*\..*/g;
        statusValidate = !linkRegExp.test(dataItem.value);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
};
