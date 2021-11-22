import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Card from './pages/card';
import Create from './pages/create';

const links = [
  { path: '/', name: 'Card' },
  { path: '/create', name: 'Create' }
];

function App() {
  const initialState = {
    name: {
      label: 'Имя',
      value: ''
    },
    lastname: {
      label: 'Фамилия',
      value: ''
    },
    year: {
      label: 'Год рождения',
      value: '',
      type: 'number'
    },
    portfolio: {
      label: 'Портфолио',
      value: ''
    }
  };
  const [data, setData] = useState(initialState);

  useEffect(() => {
    const student = localStorage.getItem('student');
    if (student) setData(JSON.parse(student));
  }, []);

  return <BrowserRouter>
    {/* <NavBar links={links} /> */}
    <Routes>
      <Route path='/' exact element={<Card data={data} initialState={initialState} />}/>
      <Route path='/create' element={<Create data={data} setData={setData} initialState={initialState} />}/>
    </Routes>
  </BrowserRouter>;
}

export default App;