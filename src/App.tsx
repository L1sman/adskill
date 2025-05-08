/// <reference types="vite-plugin-svgr/client" />
import './App.scss'
import ClientTable from "./components/ClientTable/ClientTable.tsx";

function App() {

  return (
    <div className='main-container'>
      <ClientTable/>
    </div>
  )
}

export default App
