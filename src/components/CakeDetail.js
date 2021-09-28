// import {useState} from 'react'

function CakeCard({cake, handleDelete, handleUpdated}) {
    return (
        <div>
            <img src={cake.image} style={{width:"200px"}} alt="cake"/>
            <h1>{cake.flavor}</h1>
            <h1>{cake.size}</h1>
            <p>${cake.price}</p>
            <p>{cake.description}</p>
            <button onClick={() => handleDelete(cake.id)}>Delete</button>
            <button onClick={() => handleUpdated(cake)}>{cake.liked?"❤️" : "♡"}</button>
        </div>
    );
}

export default CakeCard;