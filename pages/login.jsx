import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation autenticarUsuario($input: AutenticarInput) {
    autenticarUsuario(input: $input) {
      token
    }
  }
`;

const Login = () => {
  // Routing
  const router = useRouter();
  
  // State del mensaje
  const [mensaje, setMensaje] = useState(null);

  // Mutation para loguear usuario
  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

  // Validación de formulario con formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email no puede ir vacio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: async (valores) => {
      console.log(valores);
      const { email, password } = valores;
      try {
        const { data } = await autenticarUsuario({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
        setMensaje('Autenticando...');
        // Guardar token en Local Storage
        const { token } = data.autenticarUsuario;
        localStorage.setItem('token', token);
        // Redireccionar
        setTimeout(() => {
          setMensaje(null);
          router.push('/');
        }, 3000);

      } catch (error) {
        setMensaje(error.message);
        setTimeout(() => {
          setMensaje(null);
        }, 3000);
      }
    },
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
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      {
        mensaje && mostrarMensaje()
      }
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            action=""
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {
                // Manejo de errores con formik
                formik.touched.email && formik.errors.email ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email}</p>
                  </div>
                ) : null
              }
            </div>
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {
                // Manejo de errores con formik
                formik.touched.password && formik.errors.password ? (
                  <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password}</p>
                  </div>
                ) : null
              }
            </div>

            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-gray-700 w-full mt-6 p-2 text-white uppercase hover:bg-gray-600"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
