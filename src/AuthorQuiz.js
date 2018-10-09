import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'



function Hero() {
  return (
    <div className="row">
      <div className="jumbotron">
        <h1>Author Quiz</h1>
        <p> Select a book written by the author </p>
      </div>
    </div>

  )
}

function Turn({author, books , highLight ,onAnswerSelected}) {
   function highlightToBgColor(highLight) {
     const mapping={
       'none' : '' ,
       'correct' : 'green',
       'wrong'  : 'red'
     }

     return mapping[highLight]
   }
  return (
    <div className="row turn " style={  { background: highlightToBgColor(highLight)}}>
      <div className="col-md-4 col-md-offset-1">
        <img src={author.imageUrl} className="authorimage"  alt="Author" />
      </div>

      <div className="col-md-6">
        {books.map( (title) =>  <Book title={title} key ={title}  onClick={onAnswerSelected}/> )}
      </div>
    </div>

  )
}

Turn.propTypes={
  author: PropTypes.shape({
     name: PropTypes.string.isRequired,
     imageUrl: PropTypes.string.isRequired,
     imageSource : PropTypes.string.isRequired,
     books : PropTypes.arrayOf(PropTypes.string).isRequired
  }),
   books : PropTypes.arrayOf(PropTypes.string).isRequired,
   onAnswerSelected: PropTypes.func.isRequired,
   highLight : PropTypes.string.isRequired
}
function Book ({title ,onClick}){
  return (
    <div className="answer"  onClick={ () => onClick(title) }>
      <h4 > {title} </h4>
      </div>
  )
}

function Continue( {show ,onContinue }) {
  return (
    <div className="row">
     {show ?
        <div className="col-md-11">
          <button type="button" className="btn btn-primary btn-lg pull-right" onClick={onContinue} >Continue</button>
        </div>
        : null}
     </div>

  )
}


function Footer() {
  return (
    <div id="footer" className="row">
    <div className="col-12">
     <p className="text-muted credit">All images are from < a href="http://commons.wikimedia.org/wiki/Main_Page" target="_blank ">Wikemedia Commons</a> and are in the public domain </p>
    </div>
      
    </div>

  )
}
class AuthorQuiz extends Component {

  constructor(props){
    super(props);
  }
  render() {

    return (
      <div className="container">
       
        <Hero />
        <Turn  {...this.props.turnData} highLight={this.props.highLight} onAnswerSelected={this.props.onAnswerSelected}/>
        <Continue show={this.props.highLight=='correct'} onContinue ={this.props.onContinue} />
        <Link to="/add">Add a new author </Link>
        <Footer />
      </div>
    );
  }
}

export default AuthorQuiz;
