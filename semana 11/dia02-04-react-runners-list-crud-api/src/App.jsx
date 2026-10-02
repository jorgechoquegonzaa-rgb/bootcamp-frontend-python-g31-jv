import { useState } from "react"
import Form from "./components/Form"
import Header from "./components/Header"
import List from "./components/List"
import Footer from ""

const [corredores, setCorredores] = useState([])

const API_URL = 'http'


const App = () => {
  // TODO: Darle la funcionalidad completa a este componente. Implementar el CRUD completo(Lista, crear, actualizar y eliminar) usando el apibox

  return (
    <div className="bg-white text-neutral-900 min-h-screen">

      <main className="max-w-2xl mx-auto px-6 py-16">

        <Header />

        <div className="flex gap-4">
          <Form />

          <List />
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default App