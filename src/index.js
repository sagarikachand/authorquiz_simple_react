import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter , Route ,withRouter} from 'react-router-dom'
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore'
import  AddAuthorForm from './addAuthorform'
import {  } from 'react-router';

const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books)
    }, [])
    const fourRandomBooks = shuffle(allBooks).splice(0, 4);
    const answer = sample(fourRandomBooks);
    console.log(`answer ${answer}`)
    return {
        books: fourRandomBooks,
        author: authors.find((author) => {
            return author.books.some((title) => {

                return title === answer
            })
        })

    }

}

function onAnswerSelected(answer) {
   const isCorrect = state.turnData.author.books.some((book) => book=== answer)
   state.highLight = isCorrect  ? 'correct' :'wrong';
   render();
}

function resetState(){
  return {
    turnData: getTurnData(authors),
    highLight : '',
    
  }
 
}

let state = resetState(); 

function App() {
    return (<AuthorQuiz  {...state}  
                  onAnswerSelected={onAnswerSelected} 
                  onContinue={ () => {
                      state= resetState();
                      render();
                  } }/> )
}

const AddAuthorFormWrapper= withRouter( ({history}) =>{
    return <AddAuthorForm   onAddAuthorForm={ (author)=>{
        authors.push(author);
        history.push('/')
    }}/>
})

    

function render(){
    ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Route exact path="/" component={App} />
      <Route exact path="/add" component={AddAuthorFormWrapper} />
      </React.Fragment>
    </BrowserRouter>,

        
        
        document.getElementById('root'))
}
render()    



registerServiceWorker();
