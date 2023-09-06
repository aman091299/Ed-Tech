import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className="flex flex-col gap-3 mx-auto items-center justify-center">
      <h1>
        Get in Touch
      </h1>
      <p>
        We'd love to here for you,Please fill out this form
      </p>
    
        <ContactUsForm/>
      
    </div>
  )
}

export default ContactFormSection