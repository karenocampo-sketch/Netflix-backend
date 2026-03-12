using Microsoft.AspNetCore.Mvc;
using Catalog.Service.Models;

namespace Catalog.Service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<Movie>> GetMovies()
    {
        var movies = new List<Movie>
        {
            new Movie { 
                Id = "1", 
                Title = "Peli de Acción", 
                VideoUrl = "pelicula_01", 
                Genre = new List<string>{"Acción"} 
            },
            new Movie { 
                Id = "2", 
                Title = "Documental Software", 
                VideoUrl = "pelicula_02", 
                Genre = new List<string>{"Educación"} 
            }
        };
        return Ok(movies);
    }
}