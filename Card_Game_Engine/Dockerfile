FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Card_Game_Engine/Card_Game_Engine.csproj", "Card_Game_Engine/"]
RUN dotnet restore "Card_Game_Engine/Card_Game_Engine.csproj"
COPY . .
WORKDIR "/src/Card_Game_Engine"
RUN dotnet build "Card_Game_Engine.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Card_Game_Engine.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Card_Game_Engine.dll"]
