import React from 'react';
import { Form, Input, InputOtp } from "@heroui/react";
import { MyButton } from '../../components/MyButton';
import { Link } from "@heroui/react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({
    password: false
  });
  const navigate = useNavigate();

  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "La contraseña debe tener 4 digitos";
    }

    return null;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      return;
    }

    setErrors({});

    try {
      const response = await axios.post('http://192.168.1.238:3001/login', {
        email: data.email,
        password: data.password
      });

      console.log('Login correcto', response.data);
      const token = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
      }
      localStorage.setItem('userActive', JSON.stringify(token));
      navigate('/cartelera', { replace: true });
      window.dispatchEvent(new Event("userActiveUpdated"));
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      console.log(email, password)
    }
  }
  return (
    <>
      <Form
        className="w-full h-[81vh] md:h-[79vh] justify-center items-center space-y-2 pt-4 pb-8 bg-white "
        validationErrors={errors}
        onSubmit={onSubmit}
      >
        <h1 className='ligth text-foreground text-xl font-bold'>Iniciar Sesión</h1>
        <div className="flex flex-col gap-4 max-w-md">

          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your email";
              }
              if (validationDetails.typeMismatch) {
                return "Please enter a valid email address";
              }
            }}
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
          />

          <div>
            <p className="ligth text-foreground text-small ">Password <span className='text-red-400'>*</span></p>
            <InputOtp
              isRequired
              allowedKeys={'^[0-9]*$'}
              type="password"
              errorMessage={touched.password ? getPasswordError(password) : undefined}
              isInvalid={touched.password && getPasswordError(password) !== null}
              name="password"
              size={"sm"}
              color={'primary'}
              variant={"faded"}
              length={4}
              value={password}
              onValueChange={setPassword}
              onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            />
          </div>

          <p className='text-gray-500 text-sm mb-2'>Aun no estas registrado? <Link href={'/register'} className='text-blue-400 text-sm'>Registrate</Link></p>

          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex justify-center">
            <MyButton
              text={'Enviar'}
              color={'primary'}
              type="submit"
            />
          </div>
        </div>
      </Form>
    </>
  )
}
