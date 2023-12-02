import Image from "next/image"
import useKiosco from "../hooks/useKiosco"

const Categoria = ({ categoria }) => {

  const { categoriaActual, handleClickCategoria } = useKiosco()
  const { nombre, icono, id } = categoria

  return (
    <button className={`${categoriaActual?.id === id ? "bg-amber-400" : ""} flex items-center gap-3 w-full border rounded-xl mt-3 p-4 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
      type="button"
      onClick={() => handleClickCategoria(id)}
    >
      <Image
        width={60}
        height={60}
        src={`/assets/img/icono_${icono}.svg`}
        alt="Imagen Icono"
      />
      {nombre}
    </button>
  )
}

export default Categoria