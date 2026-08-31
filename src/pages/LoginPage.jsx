import { useState } from "react";
import { login } from "../services/auth.service";

function LoginPage({ onLogin }) {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

const handleSubmit = async (event) => {
event.preventDefault();

setError(null);

try {
  const data = await login({
    email,
    password
  });

  localStorage.setItem("token", data.token);

  if (onLogin) {
    onLogin();
  }

} catch (error) {
  setError("Email o contraseña incorrectos.");
}

};

return ( <div className="login-container"> <h1>Iniciar Sesión</h1>

  {error && (
    <p className="error-msg">
      {error}
    </p>
  )}

  <form onSubmit={handleSubmit}>

    <div>
      <label>Email:</label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>

    <div>
      <label>Contraseña:</label>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button type="submit">
      Iniciar sesión
    </button>

  </form>
</div>

);
}

export default LoginPage;
