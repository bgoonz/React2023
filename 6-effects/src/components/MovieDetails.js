import Loader from "./Loader";
import StarRating from "./StarRating";
import { useState, useEffect } from "react";
const KEY = "35a9bf11";
function MovieDetails({ selectedId, onCloseMovie, onAddWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  function handleAdd() {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      userRating,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      plot,
      released,
      actors,
      director,
      genre
    };
    onAddWatched(newMovie);
    onCloseMovie();
  }
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await response.json();
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedId]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>

              <p>
                <span>⭐️</span>
                <span>{imdbRating}</span>
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
              {userRating>0&&<button className="btn-add" onClick={handleAdd}>
                + Add to list
              </button>}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring: {actors}</p>
            <p> Directed by {director}</p>
            <p>Released in {year}</p>
          </section>
        </>
      )}
    </div>
  );
}
export default MovieDetails;
