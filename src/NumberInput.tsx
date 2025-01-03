import React, { InputHTMLAttributes } from 'react'

function NumberInput({ value, onChange, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input className='outline-none border rounded-md px-2 py-1' type="number" value={value} onChange={onChange} {...rest} />
  )
}

export default NumberInput

