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
    public interface IUserService
    {
        Task<UserModel> ValidateUser(string email, string password);
        Task<UserModel> UpdateUserToken(UserModel userModel);
        Task<UserModel> GetUSerInfo(string email);
    }
}
