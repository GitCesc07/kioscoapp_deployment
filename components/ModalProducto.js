import { useState, useEffect } from "react"
import Image from "next/image"
import useKiosco from "../hooks/useKiosco"
import { formatearDinero } from "../helpers"
import Swal from "sweetalert2"

const ModalProducto = () => {

  const { producto, handleChangeModal, handleAgregarPedido, pedido } = useKiosco()
  const [cantidad, setCantidad] = useState(1)
  const [edicion, setEdicion] = useState(false)


  useEffect(() => {
    if (pedido.some((pedidoState) => pedidoState.id === producto.id)) {
      const productoEdicion = pedido.find((pedidoState) => pedidoState.id === producto.id)

      setEdicion(true)
      setCantidad(productoEdicion.cantidad)
      localStorage.setItem("pedido", JSON.stringify(producto, pedido))
    }
  }, [producto, pedido])

  //Comprobar si el modal actual esta en el pedido
  if (pedido.some(pedidoState => pedidoState.id === producto.id)) {
    console.log("Si existe...")
  }

  return (
    <div className="md:grid gap-10 grid-cols-3">
      <div className="flex justify-end col-span-3 row-span-1">
        <button
          onClick={() => {
            {
              edicion ?
                Swal.fire({
                  title: '¿Seguro desea cancelar cambios del pedido?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3730A3',
                  confirmButtonText: 'Si, Cancelar!',
                  cancelButtonColor: '#FF0000',
                  cancelButtonText: "No, Cancelar!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleChangeModal()
                  }
                })
                :
                Swal.fire({
                  title: '¿Seguro desea cancelar el pedido?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3730A3',
                  confirmButtonText: 'Si, Cancelar!',
                  cancelButtonColor: '#FF0000',
                  cancelButtonText: "No, Cancelar!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleChangeModal()
                  }
                })
            }

          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#FF0000" d="m9.4 16l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.4L14.6 8L12 10.6L9.4 8L8 9.4l2.6 2.6L8 14.6L9.4 16ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Z" /></svg>

        </button>
      </div>
      <div className="flex justify-center">
        <Image
          width={300}
          height={400}
          alt={`Imagen producto ${producto.nombre}`}
          src={`/assets/img/${producto.imagen}.jpg`}
        />
      </div>

      <div className="col-span-2">
        <h1
          className="text-3xl font-bold mt-5 text-center"
        >
          {producto.nombre}
        </h1>
        <p className="mt-5 font-black text-5xl text-amber-500 text-center">
          {formatearDinero(producto.precio)}
        </p>

        <div className="flex gap-4 mt-5 justify-center">

          <button
            type="button"
            onClick={() => {

              if (cantidad <= 1) {
                Swal.fire({
                  icon: 'error',
                  title: 'Kiosco de Comida',
                  text: 'La cantidad minima a seleccionar es 1',
                })
                return
              }
              setCantidad(cantidad - 1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <p className="text-3xl">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if (cantidad >= 10) {
                Swal.fire({
                  icon: 'error',
                  title: 'Kiosco de Comida',
                  text: 'La cantidad maxima a seleccionar es 10',
                })
                return
              }
              setCantidad(cantidad + 1)
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 px-4 py-2 rounded-md flex items-center mt-5 text-white font-bold uppercase gap-4"
            onClick={() => {

              {
                edicion ?
                  Swal.fire({
                    title: '¿Seguro desea modificar cantidad del pedido?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3730A3',
                    confirmButtonText: 'Si, modificar el Pedido!',
                    cancelButtonColor: '#FF0000',
                    cancelButtonText: "No, modificar el Pedido!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleAgregarPedido({ ...producto, cantidad })
                      handleChangeModal()
                    }
                  })
                  :
                  Swal.fire({
                    title: '¿Seguro desea agregar al pedido?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3730A3',
                    confirmButtonText: 'Si, agregar al Pedido!',
                    cancelButtonColor: '#FF0000',
                    cancelButtonText: "No, agregar al Pedido!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleAgregarPedido({ ...producto, cantidad })
                      handleChangeModal()
                    }
                  })
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"><path fill="#fff" d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z" /></svg>
            {edicion ? "Guardar Cambios" : "Agregar Pedido"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default ModalProducto