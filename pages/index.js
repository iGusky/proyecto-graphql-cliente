import Head from "next/head";
import { Layout } from "../components/Layout";
import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_CLIENTES_USUARIO = gql`
query obtenerClientesVendedor{
  obtenerClientesVendedor{
    id
    nombre
    apellido
    empresa
    email
  }
}
`;

export default function Home() {
  const router = useRouter();
  // Consulta d eapollo
  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);
  // console.log(data);
  // console.log(loading);
  // console.log(error);

  if(loading) return 'Cargando...';
  if(!data.obtenerClientesVendedor) {
    return router.push('/login');
  }

  return (
    <div>
      <Layout>
        <h2 className="text-2xl text-gray-800 font-ligth">Clientes</h2>
        <table className='table-auto shawdow-md mt-10 w-full w-lg'>
        <thead className='bg-gray-800'>
          <tr className='text-white'>
            <th className='w-1/5 py-2'>Nombre</th>
            <th className='w-1/5 py-2'>Empresa</th>
            <th className='w-1/5 py-2'>Email</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {data.obtenerClientesVendedor.map( cliente => (
            <tr key={cliente.id}>
              <td className='border px-4 py-3'>{cliente.nombre} {cliente.apellido}</td>
              <td className='border px-4 py-3'>{cliente.empresa}</td>
              <td className='border px-4 py-3'>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </Layout>
    </div>
  );
}
