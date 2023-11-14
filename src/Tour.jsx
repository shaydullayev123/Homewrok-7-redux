/* eslint-disable react/prop-types */
import { useGlobalContext } from "./context";

function Tour({ id, image, info, name, price }) {
  const { removeTour, readMore, readmore } = useGlobalContext();
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readmore ? info : `${info.substring(0, 200)}...`}
          <button onClick={() => readMore()}>
            {readmore ? "show less" : "  read more"}
          </button>
        </p>
        <button className="delete-btn" onClick={() => removeTour(id)}>
          not interested
        </button>
      </footer>
    </article>
  );
}

export default Tour;
