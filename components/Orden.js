import Image from "next/image"
import { formatearDinero } from "../helpers"
import axios from "axios"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

export default function Orden({ orden }) {

  const { id, nombre, total, pedido, estado } = orden

  const completarOrden = async () => {
    try {
      await Swal.fire({
        title: '¿Seguro desea completar cambios del pedido?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3730A3',
        confirmButtonText: 'Si, Completar!',
        cancelButtonColor: '#FF0000',
        cancelButtonText: "No, Completar!"
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`/api/ordenes/${id}`)
          toast.success("Pedido Completado", {
            position: "bottom-center",
            closeOnClick: true,
            theme: "light",
          });
        }
      })
    } catch (error) {
      toast.error("Hubo un error")
    }
  }

  return (
    <div className="border p-4 xl:p-10 space-y-5">
      <h3 className="text-2xl font-bold">Orden: <span className="text-amber-500 text-2xl md:text-3xl">{id}</span></h3>
      <p className="text-lg font-bold">Cliente: <span className="text-amber-500 text-2xl md:text-3xl">{nombre}</span></p>

      <div>
        {
          pedido.map(platillo => (
            <div key={platillo.id} className="md:py-3 flex flex-col md:flex-row border-b last-of-type:border-0 items-center">
              <div className="w-32">
                <Image
                  width={400}
                  height={500}
                  src={`/assets/img/${platillo.imagen}.jpg`}
                  alt={`Imagen Platillo ${platillo.nombre}`}
                />
              </div>

              <div className="md:p-5 py-5 space-y-2">
                <h4 className="text-xl xl:text-3xl font-bold text-amber-500">{platillo.nombre}</h4>
                <p className="text-lg font-bold"> Cantidad: {platillo.cantidad}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="md:flex md:items-center md:justify-between my-10">
        <p className="mt5 font-bold text-2xl md:text-4xl text-amber-500">
          Total a Pagar: <span className="text-gray-800">{formatearDinero(total)}</span>
        </p>
        <button
          className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:nt-0 py-3 px-8 md:px-10 rounded-lg duration-300 uppercase font-bold w-full xl:w-1/3"
          onClick={completarOrden}
        >
          Completar Orden
        </button>
      </div>
    </div>
  )
}
