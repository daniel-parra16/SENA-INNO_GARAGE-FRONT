import {useState} from "react";

function Contador (){
    const[contador, setcontador]= useState(0)

    return(
        <div>
            <p>El contador esta en:{contador}</p>
            <button onClick={() => setcontador(contador + 1)}>Aumenta</button>
        </div>
    )
}

export default Contador;