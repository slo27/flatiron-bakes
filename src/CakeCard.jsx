function CakeCard({flavor, price, size}) {
    return (
    <>
    <h1>{flavor}</h1>
    <p>${price}</p>
    <p>${size}</p>
    </>
    );
}

export default CakeCard;