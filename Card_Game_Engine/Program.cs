using Card_Game_Engine;

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
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR(); // Add this line to add SignalR services
// var bonjourAdvertiser = new BonjourServiceAdvertiser();
// bonjourAdvertiser.RegisterService();
var app = builder.Build();

// Configure the HTTP request pipeline.
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