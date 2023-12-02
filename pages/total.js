import { useEffect, useCallback } from "react"
import Layout from "../layouts/Layout"
import useKiosco from "../hooks/useKiosco"
import { formatearDinero } from "../helpers"

export default function Total() {

  const { pedido, nombre, setNombre, colocarOrden, pago, total } = useKiosco()

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0 || nombre === "" || nombre.length < 3
  }, [pedido, nombre]);

  useEffect(() => {
    comprobarPedido()
  }, [pedido, comprobarPedido])

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Total a confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido a continuación</p>
      <form
        onSubmit={colocarOrden}
      >
        <div>
          <label htmlFor="nombre" className="block uppercase text-slate-800 font-bold text-xl">Escribe tu Nombre:</label>
          <input
            id="nombre"
            type="text"
            className="bg-gray-200 w-full mt-3 xl:w-1/3 rounded-md py-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5 uppercase font-bold">
          <p className="text-2xl">
            Total a Pagar: {""} <span className="font-bold text-amber-500 text-3xl">{formatearDinero(total)}</span>
          </p>
        </div>

        <div className="mt-5">
          <button
            className={`${comprobarPedido() ? 'bg-indigo-100 cursor-not-allowed text-slate-400' : 'bg-indigo-600 hover:bg-indigo-800'} w-full xl:w-1/3 px-4 py-2 rounded-lg uppercase font-bold text-white flex items-center gap-4 justify-center`}
            disabled={comprobarPedido()}
          >
            Confirma tu pedido
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
            </svg>
          </button>
        </div>
      </form>
    </Layout >
  )
}