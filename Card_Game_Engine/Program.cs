using Card_Game_Engine.Controllers;
using Card_Game_Engine.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});

builder.Services.AddSingleton<RuleService>();
builder.Services.AddSingleton<DatabaseService>();

builder.Services.AddControllersWithViews();
builder.Services.AddSignalR(); // Add this line to add SignalR services

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseCors("CorsPolicy");
// app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();

app.MapHub<GameEngineController>("/connect"); // Map the GameHub SignalR hub

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");
app.Run();