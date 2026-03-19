namespace Catalog.Service.Models;

public class Movie
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    // IMPORTANTE: Asegúrate de que Genre sea List<string>
    public List<string> Genre { get; set; } = new(); 
    public string Thumbnail { get; set; } = string.Empty;
    // REVISA: Que VideoUrl esté escrito exactamente así
    public string VideoUrl { get; set; } = string.Empty; 
    public int Duration { get; set; }
}