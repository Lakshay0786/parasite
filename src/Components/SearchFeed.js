import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Key } from "../Utils/ApiFetch"
import Card from '../Utils/Card';

const SearchFeed = () => {

  const [genreData, setGenreData] = useState();

  const genresList = `https://api.themoviedb.org/3/genre/movie/list?api_key=${Key}&language=en-US`

  const getGenreData = async () => {
    const data = await fetch(genresList).then(res => res.json())
    setGenreData(data.genres);
  }
  // console.log(genreData)

  useEffect(() => {
    getGenreData()
  }, [])



  const smallImageUrl = "https://image.tmdb.org/t/p/w500/";
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [keypress, setkeyPress] = useState()

  const LatestApi = `https://api.themoviedb.org/3/movie/top_rated?api_key=${Key}&language=en-US&page=1`;

  const SearchApi = `https://api.themoviedb.org/3/search/multi?api_key=${Key}&query=${keypress}&include_adult=false&language=en-US&page=1`

  const inputHandler = (e) => {
    console.log(e.target.value)
    setkeyPress(e.target.value)
  }

  const optionHandler = (e) => {
    setkeyPress(e.target.value);
    getData(SearchApi)
  }

  const searchHnadler = () => {
    if (keypress && keypress.length > 0) {
      getData(SearchApi)
      setkeyPress(" ")
    }
  }


  const getData = async (Api) => {
    const data = await fetch(Api).then((res) => res.json())
    setTopRatedMovies(data.results)

    // console.log(data.results)
  }
  useEffect(() => {
    getData(LatestApi);
  }, [])
  // console.log(topRatedMovies)
  return (
    <div className='searchfeed'>
      <div className='nav'>

        <select className='selection' onChange={optionHandler}>
          {
            genreData ? (genreData.map((item) => <option >{item.name}</option>)) : (
              <option>Comedy</option>)

          }

        </select>

        <h1 className='searchtitle' >Movies & Series ...</h1>
        <div className='searchbar-div'>
          <input value={keypress} onChange={inputHandler} className='searchbar' placeholder='Search ... ' />
          <SearchIcon onClick={searchHnadler} className='searchicon' />
        </div>
      </div>
      <div className='moviesCard-div'>
        {
          topRatedMovies.map((item) => (
            <div className='SearchCard'>
              {
                item.backdrop_path ? (
                  <>
                    {

                    }
                    <img src={`${smallImageUrl}${item.backdrop_path}`} alt='ImgNotFound' className='card-img' />

                    <span className='card-title '>{item.title ? item.title : item.name}</span>
                  </>
                ) : ""
              }

            </div>
          ))
        }
      </div>
    </div>

  )
}

export default SearchFeed