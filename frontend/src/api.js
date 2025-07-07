import axios from "axios";

// API endpoint for notes backend
const API =
  "https://jrdzozmeva.execute-api.ap-southeast-1.amazonaws.com/dev/notes";

/**
 * Fetch all notes from the backend.
 * @returns {Promise} Axios response promise with notes array.
 */
export const getNotes = () => axios.get(API);

/**
 * Add a new note to the backend.
 * @param {string} content - The content of the note to add.
 * @returns {Promise} Axios response promise with created note.
 */
export const addNote = (content) => axios.post(API, { content });

/**
 * Delete a note by ID from the backend.
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise} Axios response promise.
 */
export const deleteNote = (id) => axios.delete(`${API}/${id}`);
