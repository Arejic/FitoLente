import { useNavigate } from "react-router-dom";


function MenuU(){

const navigate = useNavigate();


return (

<div className="mobile-container">


<header className="header">

<h1>
FitoLente
</h1>

</header>



<main className="content">


<button 
className="btn btn-user"
onClick={()=>navigate("/")}
>
Cambio de usuario
</button>





<div className="image-circle">

<img
src="/src/assets/img/col.png"
alt="Planta"
/>

</div>


<div className="button-row">


<button 
className="btn"
onClick={()=>navigate("/carga")}
>
Cámara
</button>



<button 
className="btn"
onClick={()=>navigate("/prehistorial")}
>
Historial
</button>


</div>



</main>


</div>

)

}


export default MenuU;