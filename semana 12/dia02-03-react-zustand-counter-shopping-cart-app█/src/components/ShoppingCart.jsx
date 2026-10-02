import { useCartStore } from "../store/cart"

const ShoppingCart = () => {
  const { cart } = useCartStore()

  return (
    <div>ShoppingCart

      {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
    </div>
  )
}

export default ShoppingCart