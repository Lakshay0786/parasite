import React from 'react'

const Card = ({ baseUrl, item, index, value, setValue, Movies }) => {
  // console.log(item.backdrop_path)

  const CardHandler = (e) => {
    console.log(Movies.results[index])

    setValue(index)

    console.log(index)
  }
  return (

    <div onClick={CardHandler} className='Card'>
      <img src={`${baseUrl}${item.backdrop_path}`} alt='bg-img' className='card-img' />
      <span className='card-title '>{item.original_title}</span>
    </div>
  )
}

export default Card