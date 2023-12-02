import Image from "next/image"
import { formatearDinero } from "../helpers"
import useKiosco from "../hooks/useKiosco"
import Swal from "sweetalert2"

const ResumenProducto = ({ pedidos }) => {

  const { handleEditarCantidades, handleEliminarProducto } = useKiosco()

  return (
    <div className="shadow p-5 mb-3 flex flex-col lg:flex-row gap-10 items-center">
      <div className="">
        <Image
          width={300}
          height={400}
          alt={`Imagen de Producto ${pedidos.nombre}`}
          src={`/assets/img/${pedidos.imagen}.jpg`}
        />
      </div>

      <div>
        <p className="text-3xl font-bold text-stone-700">Producto: <span className="text-black">{pedidos.nombre}</span></p>
        <p className="text-xl font-bold mt-2 text-stone-700">Cantidad: <span className="text-black">{pedidos.cantidad}</span></p>
        <p className="text-xl font-bold mt-2 text-stone-700">Precio: <span className="text-amber-500">{formatearDinero(pedidos.precio)}</span></p>
        <p className="font-bold text-base mt-2 text-stone-700">Subtotal: <span className="text-black">{formatearDinero(pedidos.precio * pedidos.cantidad)}</span></p>
      </div>

      <div className="flex items-center gap-4 lg:gap-0 flex-row lg:flex-col justify-center">
        <button
          type="button"
          className="bg-sky-600 flex items-center gap-4 py-2 px-4 text-white rounded-md font-bold uppercase shadow-md w-full hover:bg-sky-800 transition duration-500"
          onClick={() => handleEditarCantidades(pedidos.id)}
        >
          Modificar
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="m19.3 8.925l-4.25-4.2L17.875 1.9L22.1 6.125l-2.8 2.8ZM3 21v-4.25l10.6-10.6l4.25 4.25L7.25 21H3Z" /></svg>
        </button>

        <button
          type="button"
          className="bg-red-600 flex items-center gap-4 py-2 px-4 text-white rounded-md font-bold uppercase shadow-md w-full hover:bg-red-700 transition duration-500 lg:mt-4"
          onClick={() => {
            Swal.fire({
              title: '¿Seguro desea eliminar el producto del pedido?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3730A3',
              confirmButtonText: 'Si, eliminar producto!',
              cancelButtonColor: '#FF0000',
              cancelButtonText: "No, eliminar producto!"
            }).then((result) => {
              if (result.isConfirmed) {
                handleEliminarProducto(pedidos?.id)
              }
            })
          }}
        >
          Eliminar
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M7 21q-.825 0-1.413-.588T5 19V6q-.425 0-.713-.288T4 5q0-.425.288-.713T5 4h4q0-.425.288-.713T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.588 1.413T17 21H7ZM17 6H7v13h10V6ZM9 17h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" /></svg>
        </button>
      </div>
    </div>
  )
}

export default ResumenProducto