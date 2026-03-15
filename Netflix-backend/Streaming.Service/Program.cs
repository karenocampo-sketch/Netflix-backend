using Microsoft.Extensions.FileProviders;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");

// --- CONFIGURACIÓN DE STREAMING ---
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "Videos")),
    RequestPath = "/watch"
});
// ----------------------------------

var profiles = new List<Profile>
{
    new Profile(Guid.NewGuid(), "Alice", "alice@example.com"),
    new Profile(Guid.NewGuid(), "Bob", "bob@example.com"),
    new Profile(Guid.NewGuid(), "Carol", "carol@example.com")
};

app.MapGet("/profiles", () => Results.Ok(profiles));

app.MapDelete("/profiles/{id}", (Guid id) =>
{
    var profile = profiles.FirstOrDefault(p => p.Id == id);
    if (profile == null)
        return Results.NotFound(new { message = "Profile not found" });

    profiles.Remove(profile);
    return Results.NoContent();
});

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

record Profile(Guid Id, string Name, string Email);
