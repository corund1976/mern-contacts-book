import React from 'react';
import Input from '../input/Input';
import './signup.css'

const Signup = () => {
  return (
    <div className='signup'>
      <div className='signup__header'>Signup</div>
      <Input />
      <Input />
      <Input />
      <Input />
      <button className='signup__btn'>Enter</button>
    </div>
  )
}

export default Signup