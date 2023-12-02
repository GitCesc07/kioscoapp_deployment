import Head from "next/head"
import Sidebar from "../components/Sidebar"
import Pasos from "../components/Pasos";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify"
import useKiosco from "../hooks/useKiosco";
import ReactModal from "react-modal"
import "react-toastify/dist/ReactToastify.css"


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#__next');

export default function Layout({ children, pagina }) {

  const { modal } = useKiosco()

  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Kiosco Cafetería, Menú Cafetería"></meta>
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5 p-4 md:p-0 md:ml-4">
          <Sidebar />
        </aside>

        <main className="md:8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll">
          <div className="p-10">
            <Pasos />
            {children}
          </div>
        </main>
      </div>

      {modal && (
        <ReactModal
          isOpen={modal}
          style={customStyles}
        >
          <ModalProducto />
        </ReactModal>
      )}

      <ToastContainer />
    </>
  )
}