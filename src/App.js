import React, { Component } from 'react';
import Icon from "./Components/Icon/Icon";
import NoteList from "./Components/NoteList/NoteList";
import AddNoteForm from "./Components/AddNoteForm/AddNoteForm";
import './App.css';


class App extends Component {

  state = {
    notes: ["Proper Note 1",
      "Proper Note 2",
      "😀",
      "",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus ante metus, vel consectetur urna mollis ut. Fusce vel massa vestibulum, viverra sem eget, gravida lectus. Aliquam ac dui non."],
    newNoteValue: "",
    isHidden: true
  }


  handleInputChange = event => {
    this.setState({ newNoteValue: event.target.value })
  }

  handleAddNote = event => {
    event.preventDefault();
    let noteToAdd = this.state.newNoteValue;
    this.setState({ notes: this.state.notes.concat(noteToAdd), newNoteValue: "" });
  }

  handleDeleteNote = index => {
    let array = [...this.state.notes]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({ notes: array });
  }

  handleMinMax = () => {
    if (this.state.isHidden) {
      this.setState({ isHidden: false })
    }
    else {
      this.setState({ isHidden: true })
    }
  }

  render() {

    return (<div className="App">
      <section className="mainPageSection">

        <div className="sideView">
          <h3>My notes</h3>
          <hr />
          <NoteList notes={this.state.notes} wait={2000} onDelete={this.handleDeleteNote} />
        </div>

        <div className="dialogWindowView">

          <div className={this.state.isHidden ? "quickListView hide" : "quickListView"}>
            <h3 className="listTitle">Append some new notes</h3>
            <div className="list">
              <NoteList notes={this.state.notes} wait={1000} onDelete={this.handleDeleteNote} />
            </div>

            <AddNoteForm
              onSubmit={this.handleAddNote}
              value={this.state.newNoteValue}
              onChange={this.handleInputChange}
            />
          </div>
          <Icon click={this.handleMinMax}></Icon>
        </div>

      </section>
    </div>);
  }
}

export default App;
