import { useState, useEffect } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import SearchFeed from './Components/SearchFeed';
import TvShows from './Components/TvShows';
import Card from './Utils/Card';
import TopMovies from './Components/TopMovies';


function App() {
  const logoImageUrl = "https://image.tmdb.org/t/p/w185/";
  const smallImageUrl = "https://image.tmdb.org/t/p/w500/";
  const largeImageUrl = "https://image.tmdb.org/t/p/original/"

  const [Movies, setMovies] = useState();
  const [value, setValue] = useState(0);
  const [logoImg, setLogoImg] = useState();


  const FetchMovieApi = async () => {
    const res = await fetch("https://api.themoviedb.org/3/movie/popular?page=1&api_key=824b1a7ea523007ee5ededda82b8cb0d"); // get data B first
    const data = await res.json();
    setMovies(data)
    return data;
  };

  const FetchLogoApi = async (data, value) => {
    const nextRes = await fetch(`https://api.themoviedb.org/3/movie/${data.results[value].id}?api_key=824b1a7ea523007ee5ededda82b8cb0d&language=en-US&append_to_response=images&include_image_language=null,en,fr,pt,de`);
    const nextData = await nextRes.json();

    return setLogoImg(nextData.images.logos[0].file_path)
  }


  useEffect(() => {
    FetchLogoApi(Movies, value, setLogoImg)


  }, [value])


  useEffect(() => {
    FetchMovieApi().then(async (data) => {
      FetchLogoApi(data, value, setLogoImg)
    })


  }, [])



  const prevHandler = () => {
    if (value <= 0) {
      setValue(19)
      FetchLogoApi(Movies, value + 19)
    } else {
      setValue((prev) => prev - 1)
      FetchLogoApi(Movies, value - 1)
    }

    FetchLogoApi(Movies, value - 1)
    setLogoImg("")
  }

  const fordHandler = () => {
    if (value >= 19) {
      setValue(0)
      FetchLogoApi(Movies, value - 19)
    } else {
      setValue((prev) => prev + 1)
      FetchLogoApi(Movies, value + 1)
    }
    setLogoImg("")
  }

  // const { backdrop_path, original_title, poster_path, vote_average, overview, } = Movies;




  // console.log(Movies?.results[0])
  return (
    <>

      {
        Movies && (
          <>

            <div style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), 
            url(${largeImageUrl}${Movies.results[value].backdrop_path})`
            }} className='Main-container'>

              <ArrowBackIosNewIcon onClick={prevHandler} className='prev' />

              <ArrowForwardIosIcon onClick={fordHandler} className='ford' />
              <div className='movie-container'>
                <div className='movie-info'>
                  <div className='logo-div'>
                    {
                      logoImg ? <img className='logoImg' src={`${logoImageUrl}${logoImg}`} alt='logoimg' /> :
                        <h1 className='title'>{Movies.results[value].original_title}</h1>
                    }
                  </div>
                  <div className='movie-rating'></div>
                  <p className='movie-details'>{Movies.results[value].overview}</p>
                  <button className='button-52'>More Details</button>
                </div>

                <div className='movie-poster'>
                  <img className='poster-img' src={`${smallImageUrl}${Movies.results[value].poster_path}`} alt='movie-poster' />
                </div>
              </div>
            </div >
            {
              Movies.results ? <div className='Card-div'>
                {
                  Movies.results.map((item, index) => <Card item={item} baseUrl={smallImageUrl} index={index} s setValue={setValue} Movies={Movies} value={value} />)
                }
              </div> : "Not Get Data"
            }
          </>
        )
      }
      < SearchFeed />
      < TvShows />
      <TopMovies />

    </>
  );
}

export default App;
