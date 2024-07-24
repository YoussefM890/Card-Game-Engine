# Base image for running the application
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Build image with Node.js installation
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src


# Copy project files and restore dependencies
COPY ["Card_Game_Engine/Card_Game_Engine.csproj", "Card_Game_Engine/"]
RUN dotnet restore "Card_Game_Engine/Card_Game_Engine.csproj"
COPY . .

# Build the project
WORKDIR "/src/Card_Game_Engine/ClientApp"
RUN npm install
RUN npm run build -- --configuration=production

# Build the project
WORKDIR "/src/Card_Game_Engine"
RUN dotnet build "Card_Game_Engine.csproj" -c Release -o /app/build

# Publish the project
FROM build AS publish
RUN dotnet publish "Card_Game_Engine.csproj" -c Release -o /app/publish /p:UseAppHost=false


# Final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "Card_Game_Engine.dll"]
