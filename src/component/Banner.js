import React, { Component } from 'react'
import { movies } from './moviesData'

export class Banner extends Component {
  render() {
    let movie = movies.results[0]
    return (
      <>
        <div className="card banner-div text-bg-dark" style={{margin:"2rem",width:'96%',}}>
            <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img" alt="..." />
            <div className="card-img-overlay"style={{display:'flex',justifyContent:'end',flexDirection:'column',}}>
                <h1 className="card-title" style={{padding:"2rem",paddingBottom:"4rem"}}>{movie.original_title}</h1>
                <p className="card-text" style={{padding:"2rem",paddingBottom:"4rem"}}>{movie.overview}</p>
            </div>
        </div>
      
      </>
    )
  }
}

export default Banner