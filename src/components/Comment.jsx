import React from "react";

const Comment = ({ data, addLike }) => {
  return (
    <article>
      <strong>{data.name} dijo:</strong>
      <p>"{data.comment}"</p>
      <em>
        {data.likes} likes - written on {data.datetime}
      </em>
      <button onClick={() => addLike(data.id)}>LIKE</button>
    </article>
  );
};

export default Comment;
