import {useState, useEffect, createContext} from "react"
import axios from "axios"
import {toast} from "react-toastify"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

const KioscoContext = createContext()
const KioscoProvider = ({children}) =>{

const pedidoLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('pedido')) ?? [] : [];
  
    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})    
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)    
    const [button, setButton ] = useState(false)
    const [pedido, setPedido] = useState(pedidoLocalStorage);
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)
    const [pago, setPago] = useState(0)
    const [paginaLista, setPaginaLista] = useState(false)

    const router = useRouter()

    const obtenerCategorias = async () => {
        const {data} = await axios('/api/Categorias')

        setCategorias(data)
    }

    useEffect(() => {
      obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])
    
    useEffect(() => {
      setPaginaLista(true)
    }, [])
    
    useEffect(() =>{
      const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)

      setTotal(nuevoTotal)      
    }, [pedido])

    useEffect(() => {
      localStorage.setItem("pedido", JSON.stringify(pedido))
    }, [pedido]) 

    const handleClickCategoria = id => {
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push("/")
    }    

    const handlesetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
      setModal(!modal)
    }

    const handleClickButton = () => {
      setButton(!button)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {

      if(pedido.some(productoState => productoState.id === producto.id)) {
        // Si el producto existe, se actualizara
        const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)

        setPedido(pedidoActualizado)
        localStorage.setItem("pedido", JSON.stringify(pedido));
        toast.success("Pedido Modificado", {
          position: "bottom-center",
          closeOnClick: true,
          theme: "light",
        });
      }
      else {
        // Si el producto no existe se agrega
        setPedido([...pedido, producto]);
        localStorage.setItem("pedido", JSON.stringify(pedido))

        toast.success("Pedido Agregado", {
          position: "bottom-center",
          closeOnClick: true,
          theme: "light",
        });
      }      
    }

    const handleEditarCantidades = (id) => {
      const productoActualizar = pedido.filter(producto => producto.id === id)

      setProducto(productoActualizar[0])
      setModal(!modal)
    }

    const handleEliminarProducto = id => {
      const pedidoActualizo = pedido.filter((producto) => producto.id !== id)

      setPedido(pedidoActualizo)
      toast.success("Producto eliminado", {
        position: "bottom-center",
        closeOnClick: true,
        theme: "light",
      });
    }

    const colocarOrden = async (e) => {
      e.preventDefault();
      
      try {
        
        await Swal.fire({
          title: "¿Seguro desea realizar su pedido?",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3730A3",
          confirmButtonText: "Si, realizar pedido!",
          cancelButtonColor: "#FF0000",
          cancelButtonText: "No, realizar pedido!",
        }).then((result) => {
          if (result.isConfirmed) {
            
            const {data} = axios.post("/api/ordenes", {pedido, nombre, total, fecha: Date.now().toString()})
            // Resetear la App
            setCategoriaActual(categorias[0]);
            setPedido([]);
            setNombre("");
            setTotal(0);
            
            toast.success("Pedido Realizado", {
              position: "bottom-center",
              closeOnClick: true,
              theme: "light",
            });

            setTimeout(() => {
              router.push("/")              
            }, 3000);
          }
          else {
            console.log("No se realizo el pedido")
          }
        });              
      } catch (error) {
        console.log(error)
      }
    };

    return (
      paginaLista ?
      <KioscoContext.Provider
        value={{
          categorias,
          categoriaActual,
          handleClickCategoria,
          producto,
          handlesetProducto,
          modal,
          handleChangeModal,
          button,
          handleClickButton,
          handleAgregarPedido,
          pedido,
          handleEditarCantidades,
          handleEliminarProducto,
          nombre,
          setNombre,
          colocarOrden,
          total
        }}
      >
        {children}
      </KioscoContext.Provider>
      : null
    );
}


export {
    KioscoProvider
}

export default KioscoContext