function Flavor({flavor, filterFlavor}) {
    return (
        <button onClick={filterFlavor} value={flavor}> 
        {flavor}
        </button>
    )
}

export default Flavor;