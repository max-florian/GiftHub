import { useState, useEffect } from "react";
import { getUserId } from "../../utils/storage";
import api from "../../utils/callApi";

interface tarjeta {
  notarjeta:any,
  mesvenc:any,
  aniovenc:any,
  cvv:any
}

interface datosDeFact{
  nombre: any,
  apellido:any,
  total:any
}

interface init{
  total:number,
  carrito: any[]
}

const usePagoTarjeta = ({total,carrito}:init) => {
  const [tarjeta, setTarjeta] = useState<tarjeta>({
    notarjeta: "",
    mesvenc: "",
    aniovenc: "",
    cvv: ""
  })
  const [datosFact, setDatosFact] = useState<datosDeFact>({
    nombre:"",
    apellido: "",
    total: 0,
  })

  const [tarjetasRegis, setTarjetaRegis] = useState(["Select"])
  const [tarjetaReg,setTarjetaReg] = useState("Select");
  const [addCard,setAddCard] = useState(true)
  const [errors,setErrors] =  useState("")

  const regex = new RegExp("^[0-9]+")

  useEffect(()=>{
    load_first_data()
  },[])

  function  load_first_data(){
    const userId = getUserId();
    api.callApi({ uri: `/users/${userId}` })
      .then(response => {
        // Asigna el nombre y apellido para los datos de facturacion
        setDatosFact({...datosFact,nombre: response.data.user.name, apellido: response.data.user.lastname, total:total})
      }).catch(console.log)

    api.callApi({ uri: `/payment/${userId}` })
      .then(response => {
        // Anade las tarjetas que ya tenga guardadas el usuario
        const aux = []
        for(let i = 0; i < response.data.length; i++){
          aux.push(response.data[i].notarjeta)
        }
        setTarjetaRegis([...tarjetasRegis,...aux])
        if(response.data.length > 0) { setAddCard(false) }
      }).catch(console.log)
  }

  const updateTarjetaReg = (value:string) => {
    setTarjetaReg(value)
  }
  const updateNoTarjeta = (value:string) => {
    setTarjeta({...tarjeta,notarjeta:value})
  }
  const updateMes = (value:string) => {
    setTarjeta({...tarjeta,mesvenc:value})
  }
  const updateAnio = (value:string) => {
    setTarjeta({...tarjeta,aniovenc:value})
  }
  const updateCVV = (value:string) => {
    setTarjeta({...tarjeta,cvv:value})
  }
  const updateAddCart = (value:boolean) => {
    setAddCard(value)
  }

  function pagar(){
    setErrors("")
    let isNewCard:boolean = true

    if(addCard){
      if(!validateNewCard()){
        return
      }
    } else {
      isNewCard = false
      if(tarjetaReg === "Select"){
        setErrors("No ha seleccionado una tarjeta")
        return;
      }
    }

    const userId = getUserId();
    api.callApi({ uri: `/payment/${userId}`, method: 'POST',
      body: {
        user_id: userId,
        carrito: carrito,
        total: total,
        isNewCard: isNewCard,
        tarjetaRegistrada: tarjetaReg,
        tarjetaNueva: tarjeta
      }})
      .then(response => {
        // Notificacion de pago exitoso etc
        console.log(response)
      }).catch(error => {
        console.error(error);
    })
  }

  function validateNewCard(){
    if(tarjeta.notarjeta !== "" && tarjeta.aniovenc !== "Año"
      && tarjeta.mesvenc !== "Mes" && tarjeta.cvv !== ""){
      if(regex.test(tarjeta.notarjeta) && tarjeta.notarjeta.length === 16
        && regex.test(tarjeta.cvv) && tarjeta.cvv.length === 3){
        // Pasa todas las pruebas
        return true
      } else {
        setErrors("El tamano de la tarjeta(16) o de cvv(3) no es correcto")
        return false
      }
    }
    setErrors("Los campos del form \"Tarjeta de credito o debito\" no deben estar vacios")
    return false
  }

  return {
    objeto: {
      tarjeta,
      tarjetasRegis,
      tarjetaReg,
      datosFact,
      errors
    },
    handler: {
      setTarjeta,
      updateTarjetaReg,
      updateNoTarjeta,
      updateMes,
      updateAnio,
      updateCVV,
      pagar,
      addCard,
      updateAddCart,
      setDatosFact
    }
  }
}

export default usePagoTarjeta;
