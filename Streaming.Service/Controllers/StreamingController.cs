using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace Streaming.Service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StreamingController : ControllerBase
    {
        [HttpGet("{videoName}")]
        public async Task<IActionResult> GetVideo(string videoName)
        {
            var filePath = Path.Combine("Videos", videoName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Video no encontrado");

            var stream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(stream, "video/mp4", enableRangeProcessing: true);
        }
    }
}