import Counter from "./components/Counter"

import ProductList from "./components/ProductList"
import ShoppingCart from "./components/ShoppingCart"

const App = () => {
  return (
    <div className="flex flex-col gap-8 p-4">

      <section className="flex gap-2">

        <ProductList />

        <ShoppingCart />

      </section>
      
      <section className="flex flex-col gap-4">
        <Counter />
        <Counter />
      </section>
    </div>
  )
}

export default App