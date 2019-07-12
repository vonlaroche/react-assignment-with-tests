import React from 'react';
import { create } from "react-test-renderer";
import ReactDOM from 'react-dom';
import App from './App';
import NoteList from "./Components/NoteList/NoteList";
import NoteListItem from "./Components/NoteListItem/NoteListItem";
import ErrorSpan from "./Components/ErrorSpan/ErrorSpan";
import { tsExternalModuleReference, exportAllDeclaration } from '@babel/types';
import { shallow, mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

const notesToTest = {
  validNote: "Proper note",
  emptyNote: "",
  tooLongNote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse rhoncus ante metus, vel consectetur urna mollis ut. Fusce vel massa vestibulum, viverra sem eget, gravida lectus. Aliquam ac dui non.",
  emojiNote: "😀😀😀"
}

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Note List Item", () => {
  test("Matches the snapshot", () => {
    const noteListItem = create(<NoteListItem checkNote={notesToTest.validNote} />);
    expect(noteListItem.toJSON()).toMatchSnapshot();
  })
});

test("Error span for empty note", () => {
  const errorSpan = shallow(<ErrorSpan checkNote={notesToTest.emptyNote} />);
  expect(errorSpan.text()).toEqual("Error, note is empty");
});

test("Error span for note longer than a 100 characters", () => {
  const errorSpan = shallow(<ErrorSpan checkNote={notesToTest.tooLongNote} />);
  expect(errorSpan.text()).toContain("Error, number of characters is longer");
});

test("Error span for note that contains emoji", () => {
  const errorSpan = shallow(<ErrorSpan checkNote={notesToTest.emojiNote} />);
  expect(errorSpan.text()).toContain("emojis");
});

test("Error span for proper note", () => {
  const errorSpan = shallow(<Error checkNote={notesToTest.validNote} />);
  expect(errorSpan.text()).toEqual("");
});

