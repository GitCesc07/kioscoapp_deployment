import Image from "next/image"
import { formatearDinero } from "../helpers"
import useKiosco from "../hooks/useKiosco"

const Producto = ({ producto }) => {

  const { handlesetProducto, handleChangeModal } = useKiosco()
  const { nombre, imagen, precio } = producto

  return (
    <div className="border p-3 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
      <Image
        src={`/assets/img/${imagen}.jpg`}
        alt={`Imagen Platillo ${nombre}`}
        width={300}
        height={400}
        className="rounded-t-lg"
      />

      <div className="p-2 xl:p-5">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        <button
          type="button"
          className="flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 py-2 px-4 uppercase font-bold rounded-lg"
          onClick={() => {
            handleChangeModal();
            handlesetProducto(producto);
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="#fff" d="M12 4.25q.325 0 .537-.213t.213-.537q0-.325-.213-.537T12 2.75q-.325 0-.537.213t-.213.537q0 .325.213.537T12 4.25ZM18 23q-2.075 0-3.538-1.463T13 18q0-2.075 1.463-3.538T18 13q2.075 0 3.538 1.463T23 18q0 2.075-1.463 3.538T18 23Zm-6.325-2H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.2q.325-.9 1.088-1.45T12 1q.95 0 1.713.55T14.8 3H19q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063V11H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h5.125q-.45.425-.813.925T11.675 15H8q-.425 0-.713.288T7 16q0 .425.288.713T8 17h3.075q-.05.25-.063.488T11 18q0 .825.15 1.538T11.675 21Zm5.825-2.5v2q0 .2.15.35T18 21q.2 0 .35-.15t.15-.35v-2h2q.2 0 .35-.15T21 18q0-.2-.15-.35t-.35-.15h-2v-2q0-.2-.15-.35T18 15q-.2 0-.35.15t-.15.35v2h-2q-.2 0-.35.15T15 18q0 .2.15.35t.35.15h2ZM8 9h8q.425 0 .713-.288T17 8q0-.425-.288-.713T16 7H8q-.425 0-.713.288T7 8q0 .425.288.713T8 9Z" /></svg>
          Agregar
        </button>
      </div>
    </div>
  )
}

export default Producto