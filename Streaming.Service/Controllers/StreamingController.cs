using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Streaming.Service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StreamingController : ControllerBase
    {
        // Nuevo endpoint para listar videos
        [HttpGet]
        public IActionResult GetVideos()
        {
            var videoFolder = "Videos";

            if (!Directory.Exists(videoFolder))
                return NotFound("Carpeta de videos no encontrada");

            var videos = Directory
                .GetFiles(videoFolder, "*.mp4")
                .Select(Path.GetFileName);

            return Ok(videos);
        }

        // Endpoint que ya tienes para hacer streaming del video
        [HttpGet("{videoName}")]
        public async Task<IActionResult> GetVideo(string videoName)
        {
            if (!videoName.EndsWith(".mp4"))
                return BadRequest("Formato no permitido");

            var filePath = Path.Combine("Videos", videoName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Video no encontrado");

            var stream = new FileStream(
                filePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read,
                4096,
                true
            );

            return File(stream, "video/mp4", enableRangeProcessing: true);
        }
    }
}
/*El método GetVideos() atiende la ruta GET /Streaming y devuelve la lista de videos.

El método GetVideo(string videoName) atiende GET /Streaming/{videoName} para hacer streaming del video seleccionado.
.*/
