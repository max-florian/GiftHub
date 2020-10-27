import { useState, useEffect } from "react";
import { getUserId } from "../../utils/storage";
import api from "../../utils/callApi";
import { ChangeEvent } from "react";

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

interface Init{
  total:number,
  carrito: any[]
}

const usePagoTarjeta = ({total,carrito}:Init) => {
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
  const [totalEnQ,setTotalEnQ] = useState(total)

  const regex = new RegExp("^[0-9]+")

  useEffect(()=>{
    load_first_data()
  },[])

  function  load_first_data(){
    const userId = getUserId();
    api.callApi({ uri: `/users/${userId}` })
      .then(response => {
        // Asigna el nombre y apellido para los datos de facturacion
        setDatosFact({...datosFact,nombre: response.data.user?.name, apellido: response.data.user?.lastname, total:total})
      }).catch(console.log)

    api.callApi({ uri: `/payment/${userId}` })
      .then(response => {
        update_tarjetas_regis(response.data)
      }).catch(console.log)

    fetch("https://my-json-server.typicode.com/Coffeepaw/AyD1API/TasaCambio")
      .then(res => res.json())
      .then((json)=>{
        setTotalEnQ(total*json[0].total)
      })
  }

  const update_tarjetas_regis = (data:any) => {
    // Anade las tarjetas que ya tenga guardadas el usuario
    const aux = []
    for(let i = 0; i < data.length; i++){
      aux.push(data[i].notarjeta)
    }
    setTarjetaRegis([...tarjetasRegis,...aux])
    if(data.length > 0) { setAddCard(false) }
  }

  const updateTarjetaReg = (e: ChangeEvent<HTMLSelectElement>) => {
    setTarjetaReg(e.target.value)
  }
  const updateNoTarjeta = (e:ChangeEvent<HTMLInputElement>) => {
    setTarjeta({...tarjeta,notarjeta:e.target.value})
  }
  const updateMes = (e: ChangeEvent<HTMLSelectElement>) => {
    setTarjeta({...tarjeta,mesvenc:e.target.value})
  }
  const updateAnio = (e:ChangeEvent<HTMLSelectElement>) => {
    setTarjeta({...tarjeta,aniovenc:e.target.value})
  }
  const updateCVV = (e:ChangeEvent<HTMLInputElement>) => {
    setTarjeta({...tarjeta,cvv:e.target.value})
  }
  const updateAddCart = (e:ChangeEvent<HTMLInputElement>) => {
    setAddCard(e.target.checked)
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
        total: totalEnQ,
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
      errors,
      totalEnQ
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
      setDatosFact,
      update_tarjetas_regis
    }
  }
}

export default usePagoTarjeta;
