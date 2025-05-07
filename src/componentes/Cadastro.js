import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  const navigate = useNavigate();

  const handleCadastro = async () => {
    if (!email || !senha || !nome || !sobrenome || !dataNascimento) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;
  
      await setDoc(doc(db, "usuarios", uid), {
        nome,
        sobrenome,
        dataNascimento
      });
  
      alert('Cadastro realizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert('Erro ao cadastrar: ' + error.message);
    }
  }; 

  return (
    <div className="App-header">
      <h1>Cadastro</h1>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="text"
        placeholder="Sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <input
        type="date"
        placeholder="Data de nascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
      />
      <button onClick={handleCadastro}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;
