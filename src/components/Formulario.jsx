import { useEffect, useState } from "react"
import styled from "@emotion/styled"
import Error from '../components/Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from './data/monedas'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;

    &:hover{
      background-color: #7A7DFE;
      cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError ] = useState (false)    
  
    const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas)
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
    const consultarAPI = async () => {
        try {
            // 1. Sustituye 'AQUI_TU_API_KEY' por tu clave real
            const apiKey = 'd23b2dd77efa3a5ef1ee0e290d2495823138a26f2d51cacd058dd949367417e1'; 
            const url = `/api-crypto/data/top/mktcapfull?limit=10&tsym=USD&api_key=${apiKey}`;
            
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();

            // Manejo de errores que pueda responder la API
            if (resultado.Response === "Error") {
                throw new Error(resultado.Message);
            }

            // 2. Iteramos sobre resultado.Data y extraemos de CoinInfo
            const arrayCriptos = resultado.Data.map(cripto => {
                return {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
            });

            setCriptos(arrayCriptos);
        } catch (error) {
            console.error("Error al consultar CryptoCompare:", error);
        }
    }
    consultarAPI();
}, []);

    const handleSubmit = e => {
        e.preventDefault()
        if([moneda, criptomoneda].includes('')) {
            setError(true)

            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
    <>
            {error && <Error>Todos los campos son obligatorios</Error>}
        <form
            onSubmit={handleSubmit}
        >

        
        <SelectMonedas />
        <SelectCriptomoneda />

        <InputSubmit 
            type="submit" 
            value="Cotizar" 
        />
        </form>
    </>
  )
}

export default Formulario