import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Card = ({ data, initialState }) => {

  const YearTitle = (count) => {
    const title = declination(count, [' год', ' года', ' лет']);
    function declination(number, titles) {
      const cases = [2, 0, 1, 1, 1, 2];
      return titles[ (number%100>4 && number%100<20)? 2:cases[(number%10<5)?number%10:5] ];
    }
    return count + title;
  }

  return <>
    <div className='container-md mt-5'>
      <div className='d-flex flex-column justify-content-center'>
        <h1>Карточка студента</h1>
        {data === initialState && <>
          <p>Нет данных</p>
          <p><button className='btn btn-primary'>
              <Link to='create'>Добавить</Link>
            </button></p>
        </>}
        {data !== initialState && <>
          {Object.keys(data).map((item, index) => <p key={index}>
            <span style={{fontWeight: 'bold'}}>{data[item].label}</span>:&nbsp;
              {item === 'portfolio' ? <a className="normalLink" href={data[item].value}>{data[item].value}</a> : data[item].value}
              &nbsp;{item === 'year' ? `(${YearTitle((Number(new Date().getFullYear()) - Number(data[item].value)))})` : ''}
          </p>)}
          <p><button className='btn btn-primary'>
            <Link to='create'>Редактировать</Link>
          </button></p>
        </>}
      </div>
    </div>
  </>;
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
  initialState: PropTypes.object.isRequired
}

export default Card;
