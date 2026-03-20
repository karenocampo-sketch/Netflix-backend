import { useState } from "react";
import { login } from "../services/authService";

export default function Login({ onLoginSuccess }) {
  const [form, setForm]       = useState({ email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [focus, setFocus]     = useState(null);
  const [btnHover, setBtnHover] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim())   e.email    = "El correo es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo inválido";
    if (!form.password)       e.password = "La contraseña es requerida";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";
    return e;
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name])  setErrors(p => ({ ...p, [name]: "" }));
    if (apiError)      setApiError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length) { setErrors(fieldErrors); return; }
    setLoading(true);
    try {
      const result = await login(form.email, form.password);
      localStorage.setItem("netflix_token", result.token);
      localStorage.setItem("netflix_user",  JSON.stringify(result.user));
      onLoginSuccess(result.user);
    } catch (err) {
      setApiError(err.message || "Credenciales incorrectas.");
    } finally {
      setLoading(false);
    }
  };

  const inp = (field) => ({
    backgroundColor: "rgba(255,255,255,0.06)",
    border: `1px solid ${errors[field] ? "#E50914" : focus === field ? "rgba(229,9,20,0.65)" : "rgba(255,255,255,0.12)"}`,
    borderRadius: "3px", color: "#fff", fontSize: "15px",
    padding: "13px 15px", width: "100%", boxSizing: "border-box",
    outline: "none", fontFamily: "Helvetica, Arial, sans-serif",
    marginTop: "6px",
  });

  return (
    <>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>

      <div style={{ minHeight:"100vh", backgroundColor:"#141414", display:"flex", flexDirection:"column", fontFamily:"Helvetica, Arial, sans-serif" }}>

        <nav style={{ padding:"20px 4%", borderBottom:"1px solid rgba(229,9,20,0.15)" }}>
          <h1 style={{ color:"#E50914", fontSize:"28px", fontWeight:"bold", margin:0 }}>NETFLIX CLONE</h1>
        </nav>

        <main style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 16px" }}>
          <div style={{ width:"100%", maxWidth:"420px", backgroundColor:"rgba(0,0,0,0.85)", border:"1px solid rgba(229,9,20,0.2)", borderRadius:"4px", padding:"48px 40px 52px", animation:"fadeUp 0.45s ease forwards" }}>

            <h2 style={{ color:"#fff", fontSize:"30px", fontWeight:"700", margin:"0 0 8px" }}>Iniciar sesión</h2>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"13px", margin:"0 0 32px" }}>Accede a tu cuenta del equipo</p>

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom:"16px" }}>
                <span style={{ color:"#888", fontSize:"11px", letterSpacing:"1.8px", textTransform:"uppercase" }}>Correo electrónico</span>
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  onFocus={() => setFocus("email")} onBlur={() => setFocus(null)}
                  placeholder="tu@correo.com" style={inp("email")} disabled={loading} />
                {errors.email && <span style={{ color:"#ff4444", fontSize:"12px" }}>⚠ {errors.email}</span>}
              </div>

              <div style={{ marginBottom:"20px" }}>
                <span style={{ color:"#888", fontSize:"11px", letterSpacing:"1.8px", textTransform:"uppercase" }}>Contraseña</span>
                <input type="password" name="password" value={form.password} onChange={handleChange}
                  onFocus={() => setFocus("password")} onBlur={() => setFocus(null)}
                  placeholder="••••••••" style={inp("password")} disabled={loading} />
                {errors.password && <span style={{ color:"#ff4444", fontSize:"12px" }}>⚠ {errors.password}</span>}
              </div>

              {apiError && (
                <div style={{ background:"rgba(229,9,20,0.1)", border:"1px solid rgba(229,9,20,0.3)", borderRadius:"3px", padding:"12px 14px", marginBottom:"16px", color:"#ff6b6b", fontSize:"13px" }}>
                  ⚠ {apiError}
                </div>
              )}

              <button type="submit" disabled={loading}
                onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)}
                style={{ width:"100%", backgroundColor: btnHover && !loading ? "#b8070f" : "#E50914", color:"#fff", border:"none", borderRadius:"3px", padding:"14px", fontSize:"16px", fontWeight:"700", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                {loading ? (
                  <><span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite", display:"inline-block" }} /> Verificando...</>
                ) : "Ingresar"}
              </button>
            </form>
          </div>
        </main>

        <footer style={{ textAlign:"center", padding:"16px", color:"rgba(255,255,255,0.15)", fontSize:"11px", letterSpacing:"1px", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          AUTH.SERVICE · PostgreSQL · JWT · feature/auth
        </footer>
      </div>
    </>
  );
}