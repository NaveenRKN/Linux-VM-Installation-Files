using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace RiskDashboard.Api.Services.ServiceContracts
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(IEnumerable<Claim> claims);
        Task<string> GenerateRefreshToken();
        Task<string> GenerateNewAccessToken(UserModel userModel);
        Task<AuthenticatedResponse> VerifyRefreshTokenAndReGenerate(string refreshToken);
    }
}
