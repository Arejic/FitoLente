import { useNavigate } from "react-router-dom";

function Inicio(){

const navigate = useNavigate();


return (
    

<div className="mobile-container">


<header className="header">

<h1>
FitoLente
</h1>

</header>



<main className="content">



<div className="image-circle">

<img
src="/src/assets/img/col.png"
alt="Planta"
/>

</div>



<button 
className="btn btn-focused"
onClick={()=>navigate("/menu")}
>
Profesor primaria
</button>



<button 
className="btn"
>
Profesor universidad
</button>


</main>


</div>

)

}

export default Inicio;