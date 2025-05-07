import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 
  // const [mensagem, setMensagem] = useState('')
  const navigate = useNavigate();

  const validarLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const uid = userCredential.user.uid;
  
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        localStorage.setItem('usuario', JSON.stringify(docSnap.data()));
        navigate('/home');
      } else {
        alert("Usuário autenticado, mas dados não encontrados.");
      }
    } catch (error) {
      alert('Usuário não está cadastrado!');
      console.error(error);
    }
  };

  return (
    <header className="App-header">
      <h1>
        Login
      </h1>
      <input
        type='e-mail'
        placeholder='Digite seu e-mail'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Digite sua senha'
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button onClick={validarLogin}>
        Acessar
      </button>
      <button onClick={() => navigate('/cadastro')}>
        Registrar-se
      </button>
      {/* <h2>
        {mensagem}
      </h2> */}
    </header>
  );
}

export default Login;
