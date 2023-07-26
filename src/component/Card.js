import React, { Component } from 'react';
// import { movies } from './moviesData';
import Banner from './Banner';
import axios from 'axios'

export class Card extends Component {
  constructor(){
    super()
    this.state={
      hover:'',
      page:[1],
      currpage:1,
      movies:[],
      favMov:[],
      
    }
  }
  async componentDidMount(){
    let datat=await JSON.parse(localStorage.getItem('favMov')||'[]');
    const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3a79df8df7341a7729bb17fecaae770a&language=en-US&page=${this.currpage}`);
    let data= res.data;
    this.setState({
      movies:[...data.results],
      favMov:[...datat]
    })
  }
   changeMovies=async()=>{
    const res= await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=3a79df8df7341a7729bb17fecaae770a&language=en-US&page=${this.state.currpage}`);
    let data= res.data;
    this.setState({
      movies:[...data.results]
    })
  }
  handleNext=()=>{
    let temp=[];
    for(let i=1;i<=this.state.page.length+1;i++){
      temp.push(i);
    }
    this.setState({
      currpage:this.state.currpage+1,
      page:[...temp],
    },this.changeMovies)
  }
  handlePrev=()=>{
    if(this.state.currpage>1){
      this.setState({
        currpage:this.state.currpage-1,
      },this.changeMovies)
    }
  }
  handlecurr=(val)=>{
    if(this.state.currpage!=val){
      this.setState({
        currpage:val,
      },this.changeMovies)
    }
  }
  handelFav=(favMovobj)=>{
    let temp=[];
  
    for (let i = 0; i < this.state.favMov.length; i++) {
      
      if(this.state.favMov[i].id!=favMovobj.id){
        temp.push(this.state.favMov[i]);
      } 
    }
      temp.push(favMovobj);
    this.setState({
      favMov:[...temp]
    })
    localStorage.setItem('favMov', JSON.stringify(temp));
  }
  handelFavRov=(favMovobj)=>{
    let temp=[];
    for (let i = 0; i < this.state.favMov.length; i++) {
      
      if(this.state.favMov[i].id!=favMovobj.id){
        temp.push(this.state.favMov[i]);
      } 
    }
      // temp.push(favMovobj);
    this.setState({
      favMov:[...temp]
    })
    localStorage.setItem('favMov', JSON.stringify(temp));
  }
  render() {
    console.log("Render");
    return (
      <>
      <Banner/>
      <h3 style={{margin :'3rem' ,display:'flex',justifyContent:'center'}}>Tranding</h3>
      <div style={{display:'flex',flexWrap: 'wrap',justifyContent: 'center'}}>
      {
        this.state.movies.map((movObj)=>(
          <div className="card" style={{width:'20rem',margin:'1rem'}} onMouseEnter={()=>this.setState({hover:movObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
          <img style={{width:'100%',height:'100%'}}  src={`https://image.tmdb.org/t/p/original${movObj.backdrop_path}`}  className="card-img" alt={movObj.title} />
          <div className="card-img-overlay "style={{display:'flex',justifyContent:'space-between',flexDirection:'column',alignItems:'center'}} >
            <h5 className="card-title" style={{color:'white',}}>{movObj.title}</h5>
            {
              this.state.favMov.some((favId)=>(
                 (favId.id==movObj.id)
                ))?this.state.hover==movObj.id && 
                <a  className="btn btn-primary" style={{display:'flex',alignItems:'center'}}  onClick={()=>this.handelFavRov(movObj)}>Remove to Favourite</a>
                :this.state.hover==movObj.id && 
                <a  className="btn btn-primary" style={{display:'flex',alignItems:'center'}}  onClick={()=>this.handelFav(movObj)}>Add to Favourite</a>
             
              
            }
          </div>
        </div>
        ))
      }
    </div>
      
        <div className="justify-content-md-center ">
          <nav aria-label="Page navigation example ">
            <ul className="pagination justify-content-md-center">
            <li className="page-item"><a className="page-link" onClick={this.handlePrev}>Previous</a></li>
              {
                this.state.page.map((val)=>(
                  <li className="page-item"><a className="page-link" onClick={()=>this.handlecurr(val)}>{val}</a></li>
                ))
              }
              <li className="page-item" ><a className="page-link" onClick={this.handleNext}>Next</a></li>
            </ul>
          </nav>
        </div> 
             
      </>
    )
  }
}

export default Card