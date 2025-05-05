import React from 'react'
import { Form, Input, Textarea, Tooltip } from "@heroui/react";
import { MyButton } from '../../components/MyButton';

export const Contacto = () => {
  const [email, setEmail] = React.useState("");
  const [textArea, setTextArea] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    setSubmitted({ ...data, textArea });
  };

  return (
    <div className="bg-white text-black h-screen md:h-[78vh]">
      <div className='flex flex-col container mx-auto pt-6'>
        <h4 className='text-xl md:text-5xl max-w-xl px-6 md:px-0'>Contacto</h4>
        <div className="flex flex-col md:flex-row flex-wrap w-full">
          <section className='flex-1 pt-8 px-6 md:px-0 pb-8'>
            <Form className="w-full max-w-xs" onSubmit={onSubmit}>
              <Input
                isRequired
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onValueChange={setEmail}
              />
              <Textarea
                isRequired
                className="max-w-xs"
                label="Description"
                labelPlacement="outside"
                placeholder="Enter your description"
                value={textArea}
                onValueChange={setTextArea}
              />
              <MyButton 
              text="Enviar" 
              type="submit"
              >
                Submit
              </MyButton>
            </Form>
          </section>
          <section className='flex-1 flex justify-center items-center'>
            <Tooltip 
            content='Enviame un mensaje por WhatsApp' 
            color='success'
            >
              <img 
              src="/img/codeWhatsApp.png" 
              alt="img para WhatsApp" 
              className='h-auto w-[60%]' 
              />
            </Tooltip>
          </section>
        </div>
      </div>
    </div>
  )
}
