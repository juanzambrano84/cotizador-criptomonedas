import {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import ImagenCripto from './img/criptoimagen.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`
const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`
const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`
function App() {

  const[monedas, setMonedas] = useState({})
  const[resultado, setResultado] = useState({})

  useEffect (() => {
    if (Object.keys(monedas).length > 0){
      const cotizarCiptos = async () => {
        try {
            const apiKey = `d23b2dd77efa3a5ef1ee0e290d2495823138a26f2d51cacd058dd949367417e1`
            const { moneda, criptomoneda } = monedas
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${apiKey}`

            const respuesta = await fetch(url)
            const resultado = await respuesta.json()
            
            setResultado(resultado.DISPLAY[criptomoneda][moneda])

        } catch (error) {
          console.log("Error al consultar Cryptocompare", error)
        }
       
      }
      cotizarCiptos()
    }
  }, [monedas])

   return (
    <Contenedor>
    <Imagen
      src={ImagenCripto}
    />
    <div>
      <Heading>Cotiza Criptomoneda al Instante</Heading>
      <Formulario 
        setMonedas={setMonedas}
      />
      {resultado.PRICE && <Resultado resultado={resultado} />}
    </div>
    </Contenedor>
  )
}

export default App
