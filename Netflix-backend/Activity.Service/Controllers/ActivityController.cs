using Microsoft.AspNetCore.Mvc;
using StackExchange.Redis;

namespace Activity.Service.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ActivityController : ControllerBase
{
    private readonly IDatabase _redis;

    public ActivityController()
    {
        // Se conecta al puerto 6379 que definiste en tu docker-compose
        var redis = ConnectionMultiplexer.Connect("localhost:6379");
        _redis = redis.GetDatabase();
    }

    [HttpPost("save")]
    public IActionResult SaveProgress(string userId, string movieId, int seconds)
    {
        // Guarda en Redis la clave "usuario:pelicula" con el valor de los segundos
        _redis.StringSet($"{userId}:{movieId}", seconds);
        return Ok(new { message = "Progreso guardado correctamente" });
    }
}