import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router'
const NUEVA_CUENTA = gql`
  mutation nuevoUsuario($input: UsuarioInput){
    nuevoUsuario(input: $input){
      id
      nombre
      email
    }
  }
`;

const NuevaCuenta = () => {
  // Mutation para crear nuevos usuarios
  const[ nuevoUsuario ] = useMutation( NUEVA_CUENTA ); 

  // State del mensaje
  const [mensaje, setMensaje] = useState( null );

  // Routing
  const router = useRouter();

  // Validación de formulario con formik
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apllido es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El nombre es obligatorio'),
      password: Yup.string().required('El password no puede ir vacio').min(6, 'El password debe ser de al menos 6 caracteres'),
    }),
    onSubmit: async valores => {
      // console.log('Enviando');
      // console.log(valores);

      const { nombre, apellido, email, password } = valores;
      try {
        const { data } = await nuevoUsuario({
          variables: {
            input: {
             nombre,
             apellido,
             email,
             password
            }
          }
        });
        // Confirmacion de usuario creado y redireccionarlo al login 
        setMensaje(`Se creo correctamente ${data.nuevoUsuario.nombre}`);
        setTimeout(() => {
          setMensaje(null);
          router.push('/login');
        }, 3000);
        

      } catch (error) {
        setMensaje(error.message);
        setTimeout(() => {
          setMensaje(null)
        }, 3000);
      }
    }
  });
  const mostrarMensaje = () => {
    return(
      <div className="bg-white py-2 px-3 w-full my-3 text-center max-w-sm mx-auto">
        <p>{ mensaje }</p>
      </div>
    )
  }

  return (
    <Layout>

      { mensaje && mostrarMensaje() }

      <h1 className="text-center text-2xl text-white font-light">
        Nueva Cuenta
      </h1>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            action=""
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={ formik.handleSubmit }
          >
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                placeholder="Nombre usuario"
                className="shadow apparence-none border rounded w-full py-2 px-2 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                value={ formik.values.nombre }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </div>
            { // Manejo de errores con formik 
            (formik.touched.nombre && formik.errors.nombre) ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{ formik.errors.nombre }</p>
              </div>
            ) : null }

            <div className="mb-4">
              <label
                htmlFor="apellido"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Apellido
              </label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellido usuario"
                className="shadow apparence-none border rounded w-full py-2 px-2 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                value={ formik.values.apellido  }
                onChange={ formik.handleChange }
              />
            </div>
            { // Manejo de errores con formik 
            (formik.touched.apellido && formik.errors.apellido) ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{ formik.errors.apellido }</p>
              </div>
            ) : null }

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email@example.com"
                className="shadow apparence-none border rounded w-full py-2 px-2 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                value={ formik.values.email }
                onChange={ formik.handleChange }
              />
            </div>
            { // Manejo de errores con formik 
            (formik.touched.email && formik.errors.email) ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{ formik.errors.email }</p>
              </div>
            ) : null }

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                placeholder="Contraseña"
                className="shadow apparence-none border rounded w-full py-2 px-2 text-gray-700 leading-tigth focus:outline-none focus:shadow-outline"
                value={ formik.values.password }
                onChange={ formik.handleChange }
              />
            </div>
            { // Manejo de errores con formik 
            (formik.touched.password && formik.errors.password) ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{ formik.errors.password }</p>
              </div>
            ) : null }

            <input
              type="submit"
              value="Crear Cuenta"
              className="bg-gray-700 w-full mt-6 p-2 text-white uppercase hover:bg-gray-600"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NuevaCuenta;
