import React from 'react'

export const MovieCard = ({
  image,
  title,
  cast,
  description,
  director,
  year,
}) => {
  return (
    <div>
      <div>
        <div>
          <h1>{title}</h1>
          
        </div>
        <div>
          <img
            src={image}
            alt={title}
          />
        </div>
      </div>
    </div>
  )
}
