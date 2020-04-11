import React, {useState, useEffect} from "react";

import "./styles.css";

import api from './services/api'

function App() {
  const [repositories, setRepositories] = useState([]);
  async function handleAddRepository() {
    const data = {
      "title": `Desafio ${Date.now()}`,
      "url": "teste.com.br",
      "techs": ["Node", "React"]
    }
    api.post('/repositories',data).then(response => {
      setRepositories([...repositories, response.data])
    });
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`);
    const elem = document.getElementById(id);
    elem.remove();
  }

  return (
    <div>
      <ul data-testid="repository-list">
       {repositories.map(repos => <li key={repos.id} id={repos.id}>
          {repos.title}
          <button onClick={() => handleRemoveRepository(repos.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
