#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["RiskDashboard_RESTAPI/RiskDashboard_RESTAPI.csproj", "RiskDashboard_RESTAPI/"]
COPY ["RiskDashboard.API.Repositories/RiskDashboard.API.Repositories.csproj", "RiskDashboard.API.Repositories/"]
COPY ["RistDashboard.Api.Entities/RistDashboard.Api.Entities.csproj", "RistDashboard.Api.Entities/"]
COPY ["RiskDashboard.Api.Services/RiskDashboard.Api.Services.csproj", "RiskDashboard.Api.Services/"]
RUN dotnet restore "RiskDashboard_RESTAPI/RiskDashboard_RESTAPI.csproj"
COPY . .
WORKDIR "/src/RiskDashboard_RESTAPI"
RUN dotnet build "RiskDashboard_RESTAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RiskDashboard_RESTAPI.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RiskDashboard_RESTAPI.dll"]