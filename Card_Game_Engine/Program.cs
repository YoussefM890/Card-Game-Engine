using Card_Game_Engine;
using Card_Game_Engine.Functions;
using Card_Game_Engine.Models;
using Card_Game_Engine.Services;

var builder = WebApplication.CreateBuilder(args);
//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
// Add services to the container.
// builder.Services.AddSingleton<GameService>();
builder.Services.AddSingleton<CardContainer>();
// builder.Services.AddSingleton<RuleService>();
builder.Services.AddSingleton<TriggerService>();
builder.Services.AddSingleton<TriggerFunctions>();
builder.Services.AddSingleton<ActionService>();
builder.Services.AddSingleton<ActionFunctions>();


builder.Services.AddControllersWithViews();
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

app.MapHub<ConnectionController>("/connect"); // Map the GameHub SignalR hub

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();