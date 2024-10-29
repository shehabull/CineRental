import { useContext, useState } from "react";
import Tag from "../../assets/tag.svg";
import { MovieContext } from "../../context";
import { getImgUrl } from "../../utils/cine-utility";
import MovieDeatilsModal from "./MovieDeatilsModal";
import Ratting from "./Ratting";

export default function MovieCard({ movie }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedMove, setSelectedMove] = useState(null);

  const { cartData, setCartData } = useContext(MovieContext);

  function handleAddtoCart(event, movie) {
    event.stopPropagation();
    const found = cartData.find((item) => {
      return item.id === movie.id;
    });

    if (!found) {
      setCartData([...cartData, movie]);
    } else {
      console.error("The movie already added");
    }
  }

  function handleModalClose() {
    setSelectedMove(null);
    setShowModal(false);
  }
  function handleMoveSelection(movie) {
    setSelectedMove(movie);
    setShowModal(true);
  }

  return (
    <>
      {showModal ? (
        <MovieDeatilsModal
          movie={selectedMove}
          onClose={handleModalClose}
          onAddtoCart={handleAddtoCart}
        />
      ) : (
        ""
      )}

      <figure className="p-4 border border-black/10 shadow-sm dark:border-white/10 rounded-xl">
        <a href="#" onClick={() => handleMoveSelection(movie)}>
          <img
            className="w-full object-cover"
            src={getImgUrl(movie.cover)}
            alt={movie.title}
          />
          <figcaption className="pt-4">
            <h3 className="text-xl mb-1">{movie.title}</h3>
            <p className="text-[#575A6E] text-sm mb-2">{movie.genre}</p>
            <div className="flex items-center space-x-1 mb-5">
              <Ratting value={movie.rating} />
            </div>
            <button
              className="bg-primary rounded-lg py-2 px-5 flex items-center justify-center gap-2 text-[#171923] font-semibold text-sm"
              href="#"
              onClick={(e) => handleAddtoCart(e, movie)}
            >
              <img src={Tag} alt="tag" />
              <span>${movie.price} | Add to Cart</span>
            </button>
          </figcaption>
        </a>
      </figure>
    </>
  );
}
