import React, { useEffect, useState } from "react";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title }) => {
  const [movies, setMovies] = useState([]);
  const [filterMovies, setFilterMovies] = useState([]);
  const [minRate, setMinRate] = useState(0);
  const [sort, setSort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedMovies = filterMovies.sort((a, b) => {
        if (sort.by === "release_date") {
          if (sort.order === "asc") {
            return new Date(a[sort.by]) - new Date(b[sort.by]);
          } else {
            return new Date(b[sort.by]) - new Date(a[sort.by]);
          }
        } else {
          if (sort.order === "asc") {
            return a[sort.by] - b[sort.by];
          } else {
            return b[sort.by] - a[sort.by];
          }
        }
      });

      setFilterMovies([...sortedMovies]);
    }
  }, [sort, filterMovies]);

  const fetchMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=41b9e2b05f2d18432d448ec64ad6bba3`
    );
    const data = await res.json();
    setMovies(data.results);
    setFilterMovies(data.results);
  };

  const handleFilter = (rate) => {
    if (rate === minRate) {
      setFilterMovies(movies);
    } else {
      setMinRate(rate);
      const filteredMovies = movies.filter((x) => x.vote_average >= rate);
      setFilterMovies(filteredMovies);
    }
  };

  const handleSort = (e) => {
    const { name, value } = e.target;
    setSort((prev) => ({ ...prev, [name]: value }));
    // const updatedSort = { ...sort, [name]: value };

    // let sortedMovies = [...filterMovies];

    // if (updatedSort.by !== "default") {
    //   sortedMovies.sort((a, b) => {
    //     if (updatedSort.order === "asc") {
    //       return a[updatedSort.by] > b[updatedSort.by] ? 1 : -1;
    //     } else {
    //       return a[updatedSort.by] < b[updatedSort.by] ? 1 : -1;
    //     }
    //   });
    // }

    // setSort(updatedSort);
    // setFilterMovies(sortedMovies);
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">{title}</h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRate={minRate}
            handleFilter={handleFilter}
            ratings={[8, 7, 6]}
          />
          <select
            name="by"
            value={sort.by}
            className="movie_sorting"
            onChange={handleSort}
          >
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>
          <select
            name="order"
            value={sort.order}
            className="movie_sorting"
            onChange={handleSort}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filterMovies.map((x) => (
          <MovieCard key={x.id} movie={x} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
