
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import  AppTurismoReal  from './AppTurismoReal'
import './index.css'
import SesionProvider from './Auth/Context/SessionProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
      <SesionProvider>
        <AppTurismoReal />
      </SesionProvider>
    </BrowserRouter>
 
)
