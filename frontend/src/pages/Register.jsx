import React from 'react';
import { Form, Input, InputOtp, Checkbox } from "@heroui/react";
import { MyButton } from '../components/MyButton';
import { DateInput } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n"
import { addToast } from "@heroui/react";
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [password, setPassword] = React.useState("");
  const [credit, setCredit] = React.useState('');
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({
    password: false,
    credit: false
  });
  const [value, setValue] = React.useState(parseDate("2025-01-01"));
  const navigate = useNavigate();

  let formatter = useDateFormatter({
    dateStyle: undefined,
    timeZone: getLocalTimeZone(),
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "La contraseña debe tener 4 digitos";
    }

    return null;
  }

  const getCreditError = (value) => {
    if (value.length < 16) {
      return "La tarjeta de credito debe tener 16 digitos";
    }

    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    const newErrors = {};

    // Validación de contraseña
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Validación de nombre
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    // Obtener fecha exacta sin problemas de zona horaria
    const formattedDate = `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`;
    const birthDate = new Date(value.year, value.month - 1, value.day); // para edad

    // Validación de edad
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const exactAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

    if (exactAge < 18) {
      newErrors.date = "Debes ser mayor de edad para registrarte.";
    } else if (exactAge > 99) {
      newErrors.date = "Edad no válida. ¿Seguro que tienes más de 99 años?";
    }

    // Validación de términos
    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });
      return;
    }

    // Si hay errores, detener
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Envío final
    setErrors({});
    data.date = formattedDate;
    setSubmitted(data);

    fetch("http://192.168.1.238:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' 
        });
        addToast({
          title: 'Éxito',
          description: 'Usuario registrado correctamente',
          color: 'success',
          timeout: 1400,
          shouldShowTimeoutProgress: true,
        });
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 1400);
      })
      .catch((err) => {
        console.error("Error al registrar:", err);
      });
  }

  return (
    <>
      <Form
        className="w-full justify-center items-center space-y-2 pt-4 pb-8 bg-white "
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmit}
      >
        <h1 className='ligth text-foreground text-xl font-bold'>Registro</h1>
        <div className="flex flex-col gap-4 w-11/12 md:w-1/3 max-w-lg">
          <Input
            isRequired
            errorMessage={({ validationDetails }) => {
              if (validationDetails.valueMissing) {
                return "Please enter your name";
              }

              return errors.name;
            }}
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your name"
            className='inherit'
          />

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

          <Input
            isRequired
            name="credit"
            errorMessage={touched.credit ? getCreditError(credit) : undefined}
            isInvalid={touched.credit && getCreditError(credit) !== null}
            label="Número de la tarjeta"
            labelPlacement="outside"
            placeholder="Introduzca su Nº de tarjeta"
            type="text"
            inputMode="numeric"
            pattern="\d{16}"
            value={credit}
            maxLength={16}
            onChange={(e) => {
              const numericValue = e.target.value.replace(/\D/g, "");
              setCredit(numericValue);
            }}
            onBlur={() => setTouched((prev) => ({ ...prev, credit: true }))}
          />

          <div className="w-full flex flex-row gap-2">
            <div className="w-full flex flex-col gap-y-2">
              <p className="ligth text-foreground text-small ">Fecha de nacimiento <span className='text-red-400'>*</span></p>
              <DateInput label="Fecha de nacimiento" value={value} onChange={setValue} />
              {errors.date && <span className="text-danger text-small">{errors.date}</span>}

            </div>
          </div>

          <Checkbox
            isRequired
            classNames={{
              label: "text-small",
            }}
            isInvalid={!!errors.terms}
            name="terms"
            validationBehavior="aria"
            value="true"
            onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
          >
            I agree to the terms and conditions
          </Checkbox>

          {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

          <div className="flex gap-4">
            <MyButton
              text={'Enviar'}
              color={'primary'}
              type="submit"
            />
            <MyButton
              text={'Restablecer'}
              color={'default'}
              variant={'bordered'}
              type="reset"
            />
          </div>
        </div>
      </Form>
    </>
  )
}
