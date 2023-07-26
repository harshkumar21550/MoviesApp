import React, { Component } from 'react'
import {movies} from './moviesData'

export default class Favourite extends Component {
    constructor(){
        super()
        this.state={
            gener:[],
            movie:[],
            currGen:"All Genere",
            currText:'',
            
        }
    }

    componentDidMount=async()=>{
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let temp=[]
        console.log("*****************");
        const items = await JSON.parse(localStorage.getItem('favMov')||'[]');
        let data= movies.results
        items.forEach((movObj)=>{
            if(!temp.includes(genreids[movObj.genre_ids[0]])){
                temp.push(genreids[movObj.genre_ids[0]]);
            }
        })
        temp.unshift("All Genere")
    
        console.log(this.state.gener);
        this.setState({
            movie:[...items],
            gener:[...temp],

        })
    }
    handalCurrGen=(gen)=>{
        console.log(gen+"  1");
        this.setState({
            currGen:gen,
            currText:'',
        })
    
    }
    handleInc=(pop)=>{
        let temp=this.state.movie;
        if(pop=="pop"){
            temp.sort(function(objA ,objB){
                return objA.popularity-objB.popularity;
            })
        }else{
            temp.sort(function(objA ,objB){
                return objA.vote_average-objB.vote_average;
            })
        }
        
        this.setState({
            movie:[...temp],
        })

    }
    handleDec=(pop)=>{
        
        let temp=this.state.movie;
        if(pop=="pop"){
            temp.sort(function(objA ,objB){
                return objB.popularity-objA.popularity;
            })
        }else{
            temp.sort(function(objA ,objB){
                return objB.vote_average-objA.vote_average;
            })
        }
        
        this.setState({
            movie:[...temp],
        })

    }

    handleDelete=(id)=>{
        let temp=this.state.movie;
        temp=temp.filter((movObj)=>{
           return movObj.id!==id.id
        })
        this.setState({
            movie:[...temp],
        })
        // console.log(temp);
        localStorage.setItem('favMov', JSON.stringify(temp));
    }
    
    render() {
    let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary',  18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    
    let filterarr=[];
    
    if(this.state.currText==""){
        filterarr=this.state.movie;
    }else{
        filterarr=this.state.movie.filter((movObj)=>{
            let title=movObj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase())
        })
    }
    if(this.state.currGen!="All Genere"&&this.state.currText==""){
        filterarr=this.state.movie.filter((movObj)=>genreids[movObj.genre_ids[0]]==this.state.currGen)
    }
    
    return (
      <>
        <div className="container text-center">
            <div class="row">
                <div className="col-3">
                    <ul className="list-group" >
                        {
                            this.state.gener.map((gen)=>(
                                gen==this.state.currGen?
                                <li className="list-group-item active" onClick={()=>this.handalCurrGen(gen)}>{gen}</li>:
                                <li className="list-group-item" onClick={()=>this.handalCurrGen(gen)}>{gen}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className="col-9" >
                    <div className="row col-6" style={{display:"flex" ,justifyContent:"start",flexWrap:'nowrap',}}>
                        <input type="text" className="input-text-group" placeholder="Search"  value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}/>
                        <input type="number" className="input-text-group" placeholder="Limit" />
                    </div>
                    <div className="row">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col" style={{display:'flex',justifyContent:"start", paddingTop:"1.2rem", height:"3rem"}}>Title </th>
                            <th scope="col">Genere </th>
                            <th scope="col"><span class="material-symbols-outlined" onClick={()=>this.handleInc('pop')}>
                                arrow_drop_down
                                </span>Popularity <span class="material-symbols-outlined" onClick={()=>this.handleDec('pop')}>
                                arrow_drop_up
                                </span></th>
                            <th scope="col"><span class="material-symbols-outlined" onClick={()=>this.handleInc('rating')}>
                                arrow_drop_down
                                </span>Rating <span class="material-symbols-outlined" onClick={()=>this.handleDec('rating')}>
                                arrow_drop_up
                                </span></th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            filterarr.map((movObj)=>(  
                                <tr> 
                                    <td style={{display:'flex',justifyContent:"start",padding:'.5rem' }} >
                                    <img   src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`} style={{width:'5rem'}}/>
                                    {movObj.original_title}</td>
                                    <td>{genreids[movObj.genre_ids[0]]}</td>
                                    <td>{movObj.popularity}</td>
                                    <td>{movObj.vote_average}</td>
                                    <th><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movObj)}>Delete</button></th>
                                </tr> 
                            ))
                           }
                        </tbody>
                        <div className="justify-content-md-center ">
                            <nav aria-label="Page navigation example ">
                                <ul className="pagination justify-content-md-center">
                                <li className="page-item"><a className="page-link" >Previous</a></li>
                                    {/* { */}
                                        {/* this.state.page.map((val)=>( */}
                                        <li className="page-item"><a className="page-link" >1</a></li>
                                        {/* )) */}
                                    {/* } */}
                                <li className="page-item" ><a className="page-link" >Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </table>
                    </div>
                </div>
            </div>
        </div>
        
      
      </>
    )
  }
}
