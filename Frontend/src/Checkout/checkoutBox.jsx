function CheckoutBox({ item }) {
  const imgPath = "src/assets/"
  return (
    <div className="order-summary-item">
      <img src={imgPath + item?.product?.image} alt={item?.product.name} className="order-item-image" />
      <div>
        <p className="item-name">{item?.product.name}</p>
        <p className="item-detail">Material: {item?.product.material}</p>
        <p className="item-price">£{item?.product.price}</p>
        <p className="item-price">Qty: {item?.qty}</p>
      </div>
    </div>
  )
}
export default CheckoutBox