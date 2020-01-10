import React from 'react'
import './ErrorMessages.scss'

const ErrorMessages = (errors) => {
  const errorMessages = Object.values(errors).map((error, i) => {
    return (
      <li className="error-message" key={i}>・ {error[0]}</li>
    )
  })
  return (
    <ul className="error-messages-wrapper">
      {errorMessages}
    </ul>
  )
}

export default ErrorMessages
