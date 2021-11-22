import React from 'react';
import FormWithValidator from '../components/FormWithValidator';
import PropTypes from 'prop-types';

const Create = ({ data, setData, initialState }) => {
  return <>
  <div className='container-md mt-5'>
    <div className='d-flex flex-column justify-content-center'>
      {data === initialState && <>
        <h1>Создать</h1>
        <FormWithValidator data={data} setData={setData} />
      </>}
      {data !== initialState && <>
        <h1>Редактировать</h1>
        <FormWithValidator data={data} setData={setData} create={false} />
      </>}
    </div>
  </div>
</>;
};

Create.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired
}

export default Create;
