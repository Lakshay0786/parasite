import React, { useEffect, useState } from 'react'
import { Key } from '../Utils/ApiFetch'

const TvShows = () => {
  const [series, setSeries] = useState()
  const TopRatesSeries = `https://api.themoviedb.org/3/trending/tv/week?api_key=${Key}`

  const smallImageUrl = "https://image.tmdb.org/t/p/w500/";

  const getSeries = async () => {
    const data = await fetch(TopRatesSeries).then(res => res.json())
    setSeries(data.results)
    // console.log(data.results)

  }
  useEffect(() => {
    getSeries()
  }, [])
  return (
    <div className='tvshowsdiv'>
      <h1 className='tvshowtitle'>TOP TV SERIES</h1>


      <div className='SeriesCard-div'>
        {
          series && series.map((item) => (
            <div className='TopSeriesSingleCard'>
              {
                item.poster_path ? (
                  <>
                    <img src={`${smallImageUrl}${item.poster_path}`} alt='ImgNotFound' className='series-img' />

                    <span className='series-title '>{item.title ? item.title : item.name}</span>
                  </>
                ) : ""
              }
            </div>
          ))
        }
      </div>
    </div >
  )
}

export default TvShows