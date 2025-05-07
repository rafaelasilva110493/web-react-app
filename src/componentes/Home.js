import { useEffect, useState } from 'react';
import './Home.css';

function Home() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      setUsuario(JSON.parse(dados));
      console.log(JSON.parse(dados))
    }
  }, []);

  if (!usuario) {
    return (
      <div className="App-header">
        <h1>Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="App-header">
      <h1>Bem-vindo, {usuario.nome}!</h1>
      <p><strong>Nome:</strong> {usuario.nome}</p>
      <p><strong>Sobrenome:</strong> {usuario.sobrenome}</p>
      <p><strong>Data de Nascimento:</strong> {formatarData(usuario.dataNascimento)}</p>
    </div>
  );
}

function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default Home;
