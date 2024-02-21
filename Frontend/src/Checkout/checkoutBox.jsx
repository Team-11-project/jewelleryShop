function CheckoutBox ({item}){
    return (
        <div className="order-summary-item">
          <img src={item?.image} alt={item?.name} className="order-item-image" />
          <div>
            <p className="item-name">{item?.name}</p>
            <p className="item-details">Material: {item?.material}</p>
            <p className="item-price">£{item?.price}</p>
          </div>
        </div>
    )
}
export default CheckoutBox