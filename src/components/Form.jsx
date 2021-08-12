import React from "react";

const Form = ({ addComment }) => {
  //Creamos la función que va a ejecutarse cuando se haga
  //click en "COMENTAR"
  const handleSubmit = (ev) => {
    //Prevenimos el reload por default
    ev.preventDefault();

    //Usamos el evento sintético para acceder a los valores
    //de los inputs y guardarlos en variables
    let nombre = ev.target.nombre.value;
    let comentario = ev.target.comentario.value;

    //Ejecutamos la función addComment en el componente superior
    addComment(nombre, comentario);

    //Dejamos el form en blanco nuevamente
    ev.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nuevo comentario:</h3>
      <input type="text" id="nombre" placeholder="Tu nombre:" />
      <textarea placeholder="Tu comentario..." id="comentario" />
      <button type="submit">COMENTAR</button>
    </form>
  );
};

export default Form;
