import React from "react";
import Delay from "react-delay";
import NoteListItem from "../NoteListItem/NoteListItem";

const NoteList = props => {
    return(props.notes.map((note, index) => (
        <Delay key={index} wait={props.wait}>
          <NoteListItem
            checkNote={note}
            key={index}
            delete={() => props.onDelete(index)}>
            {note}
          </NoteListItem>
        </Delay>
      )
    ))
}

export default NoteList;