import React from 'react'
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario{
    obtenerUsuario{
      id
      nombre
      apellido
    }
  }
`;

export const Header = () => {
  
  const router = useRouter();

  // Query apollo
  const { data, loading, error } = useQuery(OBTENER_USUARIO);

  // Proteger a n acceder a data antes de obtener usuario
  if(loading) return null;
  // Si no hay informacion
  if(!data){
    return router.push('/login');
  }

  const { nombre, apellido } = data.obtenerUsuario

  const handleCerrarSesion = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <div className='flex justify-between bm-16' >
      <p className='mr-2'>Hola: {nombre} {apellido}</p>
      <button 
        className='bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md'
        onClick={ handleCerrarSesion }
        type='button'>
        Cerrar Sesion
      </button>
    </div>
  )
}
