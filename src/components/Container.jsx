import React, { useEffect, useState } from "react";
//Importamos el hook de useEffect para poder hacer
//el fetch a la base de datos SOLO cuando ciertos
//cambios de den

import { database } from "../firebase/firebase";
import Form from "./Form";
import Comment from "./Comment";

const Container = () => {
  //Creamos un estado array que contendrá todos los comentarios
  const [comments, setComments] = useState([]);

  //Creamos una función para obtener los comentarios de Firebase
  const getComments = async () => {
    const remoteComments = database.collection("comments");

    const fetchedComments = await remoteComments.get().then((query) =>
      query.docs.map((comment) => {
        return { ...comment.data(), id: comment.id };
      })
    );

    console.log(fetchedComments);

    setComments(fetchedComments);
  };

  //Creamos un effect para que se dispare la función en el primer
  //montaje
  useEffect(() => {
    getComments();
  }, []);

  const addComment = (name, comment) => {
    //Creo un objeto que va a ser el comentario
    const newComment = {
      name: name,
      comment: comment,
      likes: 1,
      datetime: new Date().toString(),
    };

    //Establezco la referencia a la colección de firebase
    const remoteComments = database.collection("comments");

    //Intento añadir el comentario, lo cual me devuelte una promesa
    remoteComments
      .add(newComment)
      .then((res) => alert("COMENTARIO AÑADIDO CON ÉXITO"))
      .catch((err) => alert("ERROR: ", err))
      .finally(() => getComments());
  };

  //Creamos una función para añadir likes
  const addLike = async (id) => {
    //Establezco la referencia a la colección de firebase
    const remoteComments = database.collection("comments");

    //De dicha colección, agarro el comentario que coincida con el ID
    //que recibí por parámetros
    const commentToLike = remoteComments.doc(id);

    //Capturo el valor previo de "likes"
    const previousValue = await commentToLike
      .get()
      .then((res) => res.data().likes);

    //Finalmente actualizo dicho valor
    commentToLike
      .update({
        likes: previousValue + 1,
      })
      .then((res) => console.log(res))
      .catch((err) => alert(err))
      .finally(() => getComments());
  };

  //Función para borrar TODOS los comentarios (con BATCH)
  const deleteAllComments = async () => {
    //Establezco la referencia a la colección de firebase
    const remoteComments = database.collection("comments");

    //Obtengo la data de firebase
    const query = await remoteComments.get();

    //Creo la referencia al BATCH
    const batch = database.batch();

    //Establezco qué operació deberña realizar el batch
    query.docs.forEach((item) => batch.delete(item.ref));

    //EJECUTO el batch
    batch.commit();

    alert("HECHO");

    getComments();
  };

  return (
    <div>
      <Form addComment={addComment} />
      <section>
        {comments.map((item) => (
          <Comment data={item} addLike={addLike} />
        ))}
      </section>

      <button onClick={deleteAllComments}>BORRAR TODOS</button>
    </div>
  );
};

export default Container;
