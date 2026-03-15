import React, { useState } from "react";
import { Play, Info } from "lucide-react";

function App() {
  const [selectedVideo, setSelectedVideo] = useState("prueba.mp4");
  const baseUrl = "http://localhost:5003/watch/";

  const movies = [
    { id: 1, title: "Video de Prueba", file: "prueba.mp4" },
    { id: 2, title: "Medium 1", file: "181376-866506956_medium.mp4" },
    { id: 3, title: "Medium 2", file: "293085_medium.mp4" },
    { id: 4, title: "Medium 3", file: "327101_medium.mp4" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#141414",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header Estilo Netflix */}
      <nav
        style={{
          padding: "20px 50px",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
          position: "fixed",
          width: "100%",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            color: "#E50914",
            margin: 0,
            fontSize: "30px",
            fontWeight: "bold",
          }}
        >
          NETFLIX
        </h1>
      </nav>

      {/* Hero Section (Reproductor Principal) */}
      <div
        style={{
          position: "relative",
          paddingTop: "80px",
          textAlign: "center",
        }}
      >
        <video
          key={selectedVideo}
          controls
          autoPlay
          style={{
            width: "90%",
            maxWidth: "1000px",
            borderRadius: "8px",
            boxShadow: "0 0 50px rgba(0,0,0,0.8)",
          }}
        >
          <source src={`${baseUrl}${selectedVideo}`} type="video/mp4" />
        </video>
        <div style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "2.5rem" }}>{selectedVideo}</h2>
        </div>
      </div>

      {/* Fila de Películas */}
      <div style={{ padding: "50px" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
          Mi Lista de Microservicios
        </h3>
        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            paddingBottom: "20px",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              onClick={() => setSelectedVideo(movie.file)}
              style={{
                minWidth: "200px",
                height: "120px",
                backgroundColor: "#2f2f2f",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Play size={40} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
