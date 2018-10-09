import React, { Component } from 'react'

class AddAuthorForm extends Component {
   constructor(props){
       super(props);
        this.state= {
           'name':'',
           'imageUrl':'',
           'books' :[],
            'tempBook': ''
       }

       this.handleFieldChange =this.handleFieldChange.bind(this)
       this.addBook =this.addBook.bind(this);
       this.handleSubmit= this.handleSubmit.bind(this)
       this.removeBook=this.removeBook.bind(this)
   }

    handleFieldChange =(event) =>{
       this.setState ({
           [event.target.name] :[event.target.value]
       })
    }
    
    addBook =() =>{
        this.setState({
            books : this.state.books.concat(this.state.tempBook),
            tempBook :''
        })
    }
    removeBook = (book)=>{
        this.setState(
           (prevState) =>{
               return{ books : prevState.books.filter( (prevBook)=> prevBook !== book)} 
           }
            
        )
    }

    handleSubmit =(event) =>{
      event.preventDefault();
      this.props.sonAddAuthorForm(this.state)
    }
    
    render() {
        return (
            <div className="container">
                <h2> Add Author </h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-control-label">Name:</label>
                        <input name="name" className="form-control" type="text" value={this.state.name} onChange= {this.handleFieldChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl" className="form-control-label" >Image Url:</label>
                        <input name="imageUrl" className="form-control" value={this.state.imageUrl} onChange= {this.handleFieldChange} type="text" />
                    </div>
                    

                    <div className="form-group">
                        
                        <div>
                          <h4>Books </h4>
                          { this.state.books.map((book) => <p key={book}>{book} <span onClick={() =>this.removeBook(book)}>X</span></p> ) }
                        </div>
                        <label htmlFor="tempBook" className="form-control-label" >Add Book </label>
                        <input name="tempBook"  value={this.state.tempBook} onChange= {this.handleFieldChange} type="text" />
                        <input onClick={this.addBook} readOnly style={ {'padding': 5 ,'background':'#eee','cursor':'pointer' ,'height':30, 'width':30}} value="+"/>
                         
                        
                    </div>
                    <button type="submit" className="btn btn-primary">Add Author </button>
                </form>
            </div>
        )
    }


}


export default AddAuthorForm