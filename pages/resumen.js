import useKiosco from "../hooks/useKiosco"
import Layout from "../layouts/Layout"
import ResumenProducto from "../components/ResumenProducto"


export default function Resumen() {

  const { pedido } = useKiosco()

  return (
    <Layout pagina="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">Aún no hay ningún producto en tu pedido</p>
      )
        :
        pedido.map(pedidos => (
          <ResumenProducto
            key={pedidos.id}
            pedidos={pedidos}
          />
        ))}
    </Layout>
  )
}