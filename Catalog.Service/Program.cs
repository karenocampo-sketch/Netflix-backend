using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:3002");

var mongoConnectionString = builder.Configuration.GetConnectionString("MongoDb");
builder.Services.AddSingleton<IMongoClient>(new MongoClient(mongoConnectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Swagger tradicional

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(); // Esto habilita la página visual
}

// app.MapOpenApi(); // <--- COMENTA ESTA LÍNEA con // (es la que causa el conflicto de versiones)

app.MapControllers();

app.Run();