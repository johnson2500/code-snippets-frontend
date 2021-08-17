import { combineReducers } from 'redux';
import { viewNoteReducer } from './viewNoteReducers';
import { snippetsReducer } from './snippetsReducers';
import { scratchPadReducer } from './scratchPadReducers';
import { todoReducer } from './todoReducers';
import { authReducer } from './authReducers';
import { viewSnippetReducer } from './viewSnippetReducers';
import { notesReducer } from './notesReducers';

export default combineReducers({
  viewNote: viewNoteReducer,
  snippets: snippetsReducer,
  scratchPad: scratchPadReducer,
  todos: todoReducer,
  auth: authReducer,
  viewSnippet: viewSnippetReducer,
  notes: notesReducer,
});
