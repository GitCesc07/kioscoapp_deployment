import { useRouter } from "next/router"

const pasos = [
  { paso: 1, nombre: "Menú", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" }
]

const Pasos = () => {

  const router = useRouter()

  const calcularProgreso = () => {
    let valor

    if (router.pathname === "/") {
      valor = 10
    }
    else if (router.pathname === "/resumen") {
      valor = 50
    }
    else {
      valor = 100
    }
    return valor
  }

  return (
    <>
      <div className="flex justify-between mb-5 flex-col md:flex-row gap-4">
        {pasos.map(paso => (
          <button
            className="text-2xl font-bold border-b-4 border-amber-600 py-2 px-4 rounded-lg md:hover:-translate-y-2 transition duration-500"
            onClick={() => {
              router.push(paso.url)
            }}
            key={paso.paso}
          >
            {paso.nombre}
          </button>
        ))}
      </div>

      <div className="bg-gray-100 mb-10">
        <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white" style={{ width: `${calcularProgreso()}%` }}></div>
      </div>
    </>
  )
}

export default Pasos