import React, { useState } from "react";
import {
  Play,
  Info,
  Server,
  Database,
  Shield,
  Activity,
  Film,
  FolderTree,
  FileCode,
  FileJson,
  Layout,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./auth/pages/Login";

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
  try { return JSON.parse(localStorage.getItem("netflix_user")); }
  catch { return null; }
});
if (!currentUser) {
  return <Login onLoginSuccess={(user) => setCurrentUser(user)} />;
}
  const [activeTab, setActiveTab] = useState("home");

  const baseUrl = "http://localhost:5003/watch/";

  const movies = [
    {
      id: 1,
      title: "Intro a Microservicios",
      file: "prueba.mp4",
      match: "98%",
      year: "2024",
      duration: "12 min",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      title: "Mastering C#",
      file: "181376-866506956_medium.mp4",
      match: "95%",
      year: "2023",
      duration: "45 min",
      desc: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      id: 3,
      title: "Database Flow",
      file: "293085_medium.mp4",
      match: "92%",
      year: "2024",
      duration: "30 min",
      desc: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 4,
      title: "Frontend Magic",
      file: "327101_medium.mp4",
      match: "99%",
      year: "2024",
      duration: "20 min",
      desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.",
    },
  ];

  const microservices = [
    {
      id: "auth",
      name: "Auth.Service",
      port: "5001",
      icon: <Shield size={40} color="#E50914" />,
      db: "PostgreSQL",
      task: "Maneja JWT, registro y seguridad de usuarios.",
    },
    {
      id: "catalog",
      name: "Catalog.Service",
      port: "5002",
      icon: <Database size={40} color="#E50914" />,
      db: "MongoDB",
      task: "Almacena metadata de pelis, posters y categorías.",
    },
    {
      id: "stream",
      name: "Streaming.Service",
      port: "5003",
      icon: <Film size={40} color="#E50914" />,
      db: "File System",
      task: "Motor de video que sirve archivos .mp4 por chunks.",
    },
    {
      id: "activity",
      name: "Activity.Service",
      port: "5203",
      icon: <Activity size={40} color="#E50914" />,
      db: "Redis",
      task: "Guarda el historial y el progreso de visualización.",
    },
  ];

  // ESTRUCTURA COMPLETA DEL PROYECTO
  const projectStructure = [
    {
      name: "NETFLIX CLONE (Root)",
      type: "root",
      children: [
        {
          name: "Netflix-backend/",
          type: "folder",
          children: [
            {
              name: "Auth.Service/",
              type: "subfolder",
              children: [
                { name: "Controllers/", type: "file" },
                { name: "Program.cs", type: "file" },
              ],
            },
            {
              name: "Catalog.Service/",
              type: "subfolder",
              children: [
                { name: "Models/", type: "file" },
                { name: "Data/", type: "file" },
              ],
            },
            {
              name: "Streaming.Service/",
              type: "subfolder",
              children: [
                {
                  name: "Videos/",
                  type: "folder",
                  children: [
                    { name: "prueba.mp4", type: "file" },
                    { name: "Academy/", type: "folder" },
                  ],
                },
                { name: "Program.cs", type: "file" },
              ],
            },
            { name: "Activity.Service/", type: "subfolder" },
            { name: "Netflix-backend.sln", type: "file" },
            { name: "docker-compose.yml", type: "file" },
          ],
        },
        {
          name: "netflix-frontend/",
          type: "folder",
          children: [
            {
              name: "src/",
              type: "subfolder",
              children: [
                { name: "App.jsx", type: "file" },
                { name: "index.css", type: "file" },
                { name: "main.jsx", type: "file" },
              ],
            },
            { name: "package.json", type: "file" },
            { name: "vite.config.js", type: "file" },
          ],
        },
        { name: "README.md", type: "file" },
      ],
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#141414",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Helvetica, Arial, sans-serif",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 0,
          zIndex: 200,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.95), transparent)",
        }}
      >
        <nav
          style={{
            maxWidth: "1640px",
            margin: "0 auto",
            padding: "20px 4%",
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          <h1
            style={{
              color: "#E50914",
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            NETFLIX CLONE
          </h1>
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              onClick={() => setActiveTab("home")}
              style={tabStyle(activeTab === "home")}
            >
              Inicio
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              style={tabStyle(activeTab === "architecture")}
            >
              Arquitectura
            </button>
            <button
              onClick={() => setActiveTab("sitemap")}
              style={tabStyle(activeTab === "sitemap")}
            >
              Estructura
            </button>
          </div>
        </nav>
      </div>

      <div
        style={{ maxWidth: "1640px", margin: "0 auto", position: "relative" }}
      >
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "100%",
                height: "80vh",
                backgroundColor: "#000",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <video
                key={selectedVideo?.file || movies[0].file}
                src={`${baseUrl}${selectedVideo?.file || movies[0].file}`}
                controls
                autoPlay
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0.4) 30%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "15%",
                  left: "4%",
                  maxWidth: "50%",
                  zIndex: 2,
                }}
              >
                <h1
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: "bold",
                    margin: "0 0 10px 0",
                  }}
                >
                  {selectedVideo?.title || movies[0].title}
                </h1>
                <p
                  style={{
                    fontSize: "1.2rem",
                    lineHeight: "1.4",
                    color: "#e5e5e5",
                  }}
                >
                  {selectedVideo?.desc || movies[0].desc}
                </p>
              </div>
            </div>

            <div
              style={{
                padding: "40px 4%",
                position: "relative",
                zIndex: 10,
                marginTop: "-60px",
              }}
            >
              <h3 style={{ fontSize: "1.6rem", marginBottom: "20px" }}>
                Contenido Exclusivo
              </h3>
              <div style={{ display: "flex", gap: "12px" }}>
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    onMouseEnter={() => setHoveredMovie(movie)}
                    onMouseLeave={() => setHoveredMovie(null)}
                    onClick={() => setSelectedVideo(movie)}
                    style={{
                      position: "relative",
                      minWidth: "280px",
                      height: "160px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "4px",
                      }}
                    >
                      <video
                        src={`${baseUrl}${movie.file}#t=1`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        muted
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "rgba(0,0,0,0.3)",
                        }}
                      >
                        <Play size={25} fill="white" />
                      </div>
                    </div>
                    <AnimatePresence>
                      {hoveredMovie?.id === movie.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1.15, y: -40 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          style={lightboxStyle}
                        >
                          <video
                            src={`${baseUrl}${movie.file}#t=1`}
                            style={{
                              width: "100%",
                              borderRadius: "8px 8px 0 0",
                            }}
                            muted
                            autoPlay
                          />
                          <div
                            style={{
                              padding: "15px",
                              backgroundColor: "#181818",
                              borderRadius: "0 0 8px 8px",
                            }}
                          >
                            <h4 style={{ margin: "0 0 5px 0" }}>
                              {movie.title}
                            </h4>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#46d369",
                                fontWeight: "bold",
                                marginBottom: "5px",
                              }}
                            >
                              {movie.match} coincidencia
                            </div>
                            <p
                              style={{
                                fontSize: "10px",
                                color: "#ddd",
                                lineHeight: "1.4",
                              }}
                            >
                              {movie.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARQUITECTURA (CON EL HOVER LINDO) */}
        {activeTab === "architecture" && (
          <div
            style={{
              paddingTop: "120px",
              textAlign: "center",
              paddingBottom: "50px",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
              Mapa de Microservicios
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "30px",
                marginTop: "50px",
                padding: "0 4%",
              }}
            >
              {microservices.map((s) => (
                <motion.div
                  key={s.id}
                  whileHover={{ scale: 1.05, y: -10, borderColor: "#E50914" }}
                  style={{
                    backgroundColor: "#1f1f1f",
                    padding: "40px",
                    borderRadius: "15px",
                    border: "1px solid #333",
                    transition: "border-color 0.3s",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "15px",
                      backgroundColor: "#141414",
                      borderRadius: "50%",
                      marginBottom: "20px",
                    }}
                  >
                    {s.icon}
                  </div>
                  <h3
                    style={{
                      color: "#E50914",
                      fontSize: "1.5rem",
                      margin: "10px 0",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#ccc",
                      lineHeight: "1.6",
                    }}
                  >
                    {s.task}
                  </p>
                  <div
                    style={{
                      marginTop: "25px",
                      paddingTop: "15px",
                      borderTop: "1px solid #333",
                      fontSize: "12px",
                      color: "#888",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <span>
                      <strong>DB:</strong> {s.db}
                    </span>
                    <span>
                      <strong>Port:</strong> {s.port}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ESTRUCTURA (MAPA REAL COMPLETO) */}
        {activeTab === "sitemap" && (
          <div
            style={{
              paddingTop: "120px",
              paddingBottom: "50px",
              paddingLeft: "4%",
              paddingRight: "4%",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Estructura del Proyecto
            </h2>
            <div
              style={{
                backgroundColor: "#1f1f1f",
                padding: "50px",
                borderRadius: "20px",
                border: "1px solid #333",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {projectStructure.map((node, i) => (
                <TreeNode key={i} item={node} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// COMPONENTE DE ÁRBOL RECURSIVO
function TreeNode({ item, depth = 0 }) {
  const [isOpen, setIsOpen] = useState(true);
  const isFolder = item.children && item.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 20, marginBottom: "8px" }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: isFolder ? "pointer" : "default",
          color: item.type === "root" ? "#E50914" : "white",
        }}
      >
        {isFolder ? (
          <FolderTree size={20} color={isOpen ? "#E50914" : "#888"} />
        ) : (
          <FileCode size={18} color="#666" />
        )}
        <span
          style={{ fontWeight: isFolder ? "bold" : "normal", fontSize: "15px" }}
        >
          {item.name}
        </span>
      </div>
      {isOpen && item.children && (
        <div
          style={{
            borderLeft: "1px solid #333",
            marginLeft: "9px",
            marginTop: "5px",
            paddingLeft: "15px",
          }}
        >
          {item.children.map((child, i) => (
            <TreeNode key={i} item={child} depth={0.5} />
          ))}
        </div>
      )}
    </div>
  );
}

const tabStyle = (active) => ({
  background: "none",
  border: "none",
  color: active ? "white" : "#aaa",
  fontWeight: active ? "bold" : "normal",
  cursor: "pointer",
  fontSize: "16px",
  borderBottom: active ? "3px solid #E50914" : "3px solid transparent",
  paddingBottom: "5px",
  transition: "0.3s",
  outline: "none",
});

const lightboxStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "320px",
  zIndex: 1000,
  boxShadow: "0 20px 40px rgba(0,0,0,0.9)",
  pointerEvents: "none",
};

export default App;
