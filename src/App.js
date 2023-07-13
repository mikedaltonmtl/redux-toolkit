import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useRef } from 'react'

function App() {

  const [state, setState] = useState({
    posts: [],
    title: ''
  });

  const inputElement = useRef();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(json => {
      setState(prev => ({ ...prev, posts: json}));
    })
  }, []);

  const displayPosts = state.posts.map(post => {
    return (
      <li key={post.id}>{post.title}</li>
    );
  }).reverse();

  const getNextId = function() {
    return state.posts.reduce((max, currentvalue) => {
      return currentvalue.id > max ? currentvalue.id : max;
    }, 0) + 1;
  };

  const handleChange = function(title) {
    setState(prev => ({ ...prev, title}));
  };

  const addPost = function(event) {
    event.preventDefault();
    setState(prev => ({ ...prev, posts: [...state.posts, { id: getNextId(), title: state.title}] }));
    setState(prev => ({ ...prev, title: ''}));
    inputElement.current.focus();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input
          type='text'
          placeholder='Type title here'
          ref={inputElement}
          value={state.title}
          onChange={event => handleChange(event.target.value)}
        >
        </input>
        <button type='submit' onClick={addPost}>Add Post</button>
        <ul>{displayPosts}</ul>
      </header>
    </div>
  );
}

export default App;
