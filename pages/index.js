import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layouts/Layout'
import Producto from "../components/Producto"
import useKiosco from '../hooks/useKiosco'

export default function Home() {

  const { categoriaActual } = useKiosco()

  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className='text-4xl font-black'>{categoriaActual?.nombre}</h1>
      <p className='text-2xl my-5'>
        Elige y personaliza tu pedido a continuación
      </p>

      <div className='grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {categoriaActual?.productos?.map(producto => (
          <Producto
            key={producto.id}
            producto={producto}
          />
        ))}
      </div>
    </Layout>
  )
}