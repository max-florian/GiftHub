import { useState, useEffect } from "react";

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
  total:number
}

const usePagoTarjeta = ({total}:init) => {
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

  const [tarjetasRegis, setTarjetaRegis] = useState(["Select","12345646"])
  const [tarjetaReg,setTarjetaReg] = useState("Select");
  const [addCard,setAddCard] = useState(true)
  const [errors,setErrors] =  useState("")

  const regex = new RegExp("^[0-9]+")

  useEffect(()=>{
    setDatosFact({...datosFact, total:total})
    if(tarjetasRegis.length > 1){ setAddCard(false)}
  },[])

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
    if(addCard){
      console.log("Se va agregar una nueva tarjeta")
      if(validateNewCard()){
        // Anadir la tarjeta y pagar
      }
    } else {
      console.log("Usar una tarjeta selccionada")
      if(tarjetaReg !== "Select"){
        // Pagar con tarjeta registradaa
      } else {
        setErrors("No ha seleccionado una tarjeta")
      }
    }
  }

  function validateNewCard(){
    if(tarjeta.notarjeta !== "" && tarjeta.aniovenc !== "Año"
      && tarjeta.mesvenc !== "Mes" && tarjeta.cvv !== ""){
      console.log(tarjeta.cvv.length )
      if(regex.test(tarjeta.notarjeta) && tarjeta.notarjeta.length == 16
        && regex.test(tarjeta.cvv) && tarjeta.cvv.length == 3){
        // Pasa todas las pruebas
        return true
      } else {
        setErrors("El tamano de la tarjeta(16) o de cvv(3) no es correcto")
      }
    }
    setErrors("Los campos del form \"Tarjeta de credito o debito\" no deben estar vacios")
    return false
  }

  return {
    tarjeta,
    setTarjeta,
    tarjetasRegis,
    tarjetaReg,updateTarjetaReg,
    updateNoTarjeta,
    updateMes,
    updateAnio,
    updateCVV,
    pagar,
    addCard,
    updateAddCart,
    datosFact,
    setDatosFact,
    errors
  }
}

export default usePagoTarjeta;
