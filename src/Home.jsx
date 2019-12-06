import React, { Component } from 'react';
import {L6_Mapping, L5_Mapping, L4_Mapping, L3_Mapping, L2_Mapping, L1_Mapping} from './BookData'
import {updateBookQuantitiesCopy, L5Calculation, L4Calculation, L3Calculation, L2Calculation} from './calculationFomulas'
class App extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      bookSelected:"",
      possibleOwnedBook:"Select a book",
      ownedBooks: [],
      quantity:0,
      bookOwnedQuantities: [],
      targetBook: "",
      booksNeededNames: [],
      booksNeededQuantities: [],
      calculated: false,
    }
  }

  handleSelectedBook (event) {
    console.log(event.target.value)
    this.setState({targetBook:event.target.value})
  }

  handleOwnedBook (event) {
    console.log("handleOwnedBook------", event.target.value)
    if (!this.state.ownedBooks.includes(event.target.value)){
      this.setState({
        ownedBooks: this.state.ownedBooks.concat(event.target.value),
        bookOwnedQuantities: this.state.bookOwnedQuantities.concat(0)
      })
    }
    
    this.setState({
      possibleOwnedBook: "Select Book"
    })
  }

  handleQuantityChange(event) {
    console.log(event.target)
    let iBook = Number(event.target.id)
    console.log("iBook----", iBook)
    let quantityArray = this.state.bookOwnedQuantities.slice(0)
    quantityArray[iBook]=Number(event.target.value)||0
    this.setState({
        bookOwnedQuantities: quantityArray
    })

  }

  handleTargetBook(event) {
    this.setState({targetBook:event.target.value})
  }

  deleteOwnedBookFromMapping(book, mapping){
    delete mapping[book]
  }

  calculateNeeded(event){
    console.log(this.state.targetBook, "targetBook-------")
    
    let copyOfBookOwnedQuantities = this.state.bookOwnedQuantities.slice()
    this.setState((prevState) => ({
      calculated: !prevState.calculated
    }))
    let baseNeeds = {
      "Resolve": 0,
      "Soaring Heart": 0,
      "Sinful Flame": 0,
      "Firbolg Drudge":0,
      "Tome of Grace":0,
      "A Flowerless Plant":0,
      "Flanker's Tome":0,
      "Celestial Giant":0
    }

    let L5BooksNeededMapping = Object.assign({}, L5_Mapping)
    let L4BooksNeededMapping = Object.assign({}, L4_Mapping)
    let L3BooksNeededMapping = Object.assign({}, L3_Mapping)
    let L2BooksNeededMapping = Object.assign({}, L2_Mapping)
    console.log(this.state.ownedBooks, "owned -----")
    console.log(copyOfBookOwnedQuantities, "owned QQQQ-----")
    console.log(L2BooksNeededMapping)
  if(L6_Mapping[this.state.targetBook])
  for (let L5Book of L6_Mapping[this.state.targetBook]){
    if(this.state.ownedBooks.includes(L5Book)) {
      let indexBook = this.state.ownedBooks.indexOf(L5Book)
      let quantity = copyOfBookOwnedQuantities[indexBook]
      if(quantity> 0){
        copyOfBookOwnedQuantities[indexBook]-=1
        continue
      }
    }
    console.log('targetBook--------', this.state.targetBook)
    if(L5BooksNeededMapping[L5Book])
    for (let L4Book of L5BooksNeededMapping[L5Book]){
      if(this.state.ownedBooks.includes(L4Book)) {
        let indexBook = this.state.ownedBooks.indexOf(L4Book)
        let quantity = copyOfBookOwnedQuantities[indexBook]
        if(quantity> 0){
          copyOfBookOwnedQuantities[indexBook]-=1
          continue
        }
      }
      if(L4BooksNeededMapping[L4Book]){
        for (let L3Book of L4BooksNeededMapping[L4Book]){
          if(this.state.ownedBooks.includes(L3Book)) {
            let indexBook = this.state.ownedBooks.indexOf(L3Book)
            let quantity = copyOfBookOwnedQuantities[indexBook]
            if(quantity> 0){
              copyOfBookOwnedQuantities[indexBook]-=1
              continue
            }
          }
          if(L3BooksNeededMapping[L3Book]){
            for( let L2Book of L3BooksNeededMapping[L3Book]){
              if(this.state.ownedBooks.includes(L2Book)) {
                let indexBook = this.state.ownedBooks.indexOf(L2Book)
                let quantity = copyOfBookOwnedQuantities[indexBook]
                if(quantity> 0){
                  copyOfBookOwnedQuantities[indexBook]-=1
                  continue
                }
              }
              if(L2BooksNeededMapping[L2Book])
              for (let L1Book of L2BooksNeededMapping[L2Book]){
                baseNeeds[L1Book]+=2
              }
            }
          }
        }
      }
    }
  }
  if (L5BooksNeededMapping[this.state.targetBook]) {
    console.log('L5 targetBook--------', this.state.targetBook)
     L5Calculation(
      this.state.targetBook,
      L5BooksNeededMapping,
      L4BooksNeededMapping,
      L3BooksNeededMapping,
      L2BooksNeededMapping,
      copyOfBookOwnedQuantities,
      this.state.ownedBooks,
      baseNeeds
    )
  } else if(L4BooksNeededMapping[this.state.targetBook]) {
    L4Calculation(
      this.state.targetBook,
      L4BooksNeededMapping,
      L3BooksNeededMapping,
      L2BooksNeededMapping,
      copyOfBookOwnedQuantities,
      this.state.ownedBooks,
      baseNeeds
    )
  } else if(L3BooksNeededMapping[this.state.targetBook]) {
    console.log('Does it ever get to L3----')
    L3Calculation(
      this.state.targetBook,
      L3BooksNeededMapping,
      L2BooksNeededMapping,
      copyOfBookOwnedQuantities,
      this.state.ownedBooks,
      baseNeeds
    )
  } else if(L2BooksNeededMapping[this.state.targetBook]) {
   
    console.log('Does it ever get to L2----')
    L2Calculation(
      this.state.targetBook,
      L2BooksNeededMapping,
      baseNeeds
    )
  }

    let quantities = []
    for(let book of this.state.ownedBooks) {
      if (baseNeeds[book]) {
        let indexBook = this.state.ownedBooks.indexOf(book)
        let quantity = copyOfBookOwnedQuantities[indexBook]
        baseNeeds[book] -= quantity
        if(baseNeeds[book] <0) baseNeeds[book] = 0
      }
    }
    console.log('baseNeeds---', baseNeeds)
    this.setState({
      booksNeededNames: Object.keys(baseNeeds),
      booksNeededQuantities: Object.keys(baseNeeds).map((book)=> (baseNeeds[book]))
    })

  }

  updateOwnedBookQuantity(book, quantity){
    let bookIndex=this.state.ownedBooks.indexOf(book)
    let quantityArray = this.state.ownedBooks.slice(0)
    quantityArray[bookIndex]+=quantity
    this.setState({
        bookOwnedQuantities: quantityArray
    })
  }
  
  render() {
    this.updateOwnedBookQuantity=this.updateOwnedBookQuantity.bind(this)
    this.calculateNeeded=this.calculateNeeded.bind(this)
    this.deleteOwnedBookFromMapping = this.deleteOwnedBookFromMapping.bind(this);
    this.handleSelectedBook = this.handleSelectedBook.bind(this);
    this.handleOwnedBook = this.handleOwnedBook.bind(this);
    this.handleTargetBook = this.handleTargetBook.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    console.log("state----",this.state)
    return (
      <div className="container">
        <div className="calculationPieces">
          <h1>Books owned </h1>
          <div className="row">
            
            {
              this.state.ownedBooks.map((book, i) => (
                <div className="row">
                  <div className="col-sm-4">
                    <p>
                      {book}
                    </p>
                      <input id={i} key={i} name={book} type="text" placeholder="quantity... 0, 1, 2" onChange={this.handleQuantityChange} value={this.state.bookOwnedQuantities[i]}/>
                  </div>
                </div>
              ))
            }
            <div className="col-sm-4">

            <form id="bookLevels">
                <div className="form-group">
                  <label for="levelOneBook">Level 1 Books</label>
                  <select id ="levelOneBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                  <option value="R1-0">Select Book</option>
                  {
                    Object.keys(L1_Mapping).map((bookName) => (
                      <option value={bookName}>{bookName}</option>
                    ))
                  }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelTwoBook">Level 2 Books</label>
                  <select id ="levelTwoBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                    <option value="R2-0">Select Book</option>
                    {
                      Object.keys(L2_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label for="levelThreeBook">Level 3 Books</label>
                  <select id ="levelThreeBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                    <option value="R3-0">Select Book</option>
                    {
                      Object.keys(L3_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelFourBook">Level 4 Books</label>
                  <select id ="levelFourBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                    <option value="R4-0">Select Book</option>
                    {
                      Object.keys(L4_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelFiveBook">Level 5 Books</label>
                  <select id ="levelFiveBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                    <option value="R5-0">Select Book</option>
                    {
                      Object.keys(L5_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelSixBook">Level 6 Books</label>
                  <select id ="levelSixBook" onChange={this.handleOwnedBook} value={this.state.possibleOwnedBook}>
                    <option value="R6-0">Select Book</option>
                    {
                      Object.keys(L6_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>                                                      
              </form>
           </div>
          </div>
        <h1>{this.state.calculated === false?"Select Target Book": "Target Book: " + this.state.targetBook} </h1>
        {this.state.calculated? null : 
              <form id="bookLevels">
                <div className="form-group">
                  <label for="levelOneBook">Level 1 Books</label>
                  <select id ="levelOneBook" onChange={this.handleTargetBook}>
                  <option value="R1-0">Select Book</option>
                  {
                    Object.keys(L1_Mapping).map((bookName) => (
                      <option value={bookName}>{bookName}</option>
                    ))
                  }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelTwoBook">Level 2 Books</label>
                  <select id ="levelTwoBook" onChange={this.handleTargetBook}>
                    <option value="R2-0">Select Book</option>
                    {
                      Object.keys(L2_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <label for="levelThreeBook">Level 3 Books</label>
                  <select id ="levelThreeBook" onChange={this.handleTargetBook}>
                    <option value="R3-0">Select Book</option>
                    {
                      Object.keys(L3_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelFourBook">Level 4 Books</label>
                  <select id ="levelFourBook" onChange={this.handleTargetBook}>
                    <option value="R4-0">Select Book</option>
                    {
                      Object.keys(L4_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelFiveBook">Level 5 Books</label>
                  <select id ="levelFiveBook" onChange={this.handleTargetBook}>
                    <option value="R5-0">Select Book</option>
                    {
                      Object.keys(L5_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>
                <div class ="form-group">
                  <label for="levelSixBook">Level 6 Books</label>
                  <select id ="levelSixBook" onChange={this.handleTargetBook}>
                    <option value="R6-0">Select Book</option>
                    {
                      Object.keys(L6_Mapping).map((bookName) => (
                        <option value={bookName}>{bookName}</option>
                      ))
                    }
                  </select>
                </div>                                                      
              </form>}
        </div>
        <button type="button" class="btn btn-primary" onClick={this.calculateNeeded}>{!this.state.calculated?"Calculate":"Calculate Again"}</button>

        {
          this.state.booksNeeded !== ""? 
          <div>
            <h1>Books Needed</h1>
            {
              !this.state.calculated? null: this.state.booksNeededNames.map((name, i) => (
                <p>{name}: {this.state.booksNeededQuantities[i]}</p>
              ))
            }
          </div>
          :""
        }
      </div>
    );
  }
}

export default App;
