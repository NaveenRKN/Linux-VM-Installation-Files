using AutoMapper;
using Microsoft.Extensions.Configuration;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.API.Repositories.RepositoriesContracts.Base;
using RiskDashboard_RESTAPI.Models;

namespace RiskDashboard.Api.Services.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IRepositoryWrapper _repoWrapper;
        private IConfiguration _config;
        public UserService(IRepositoryWrapper repoWrapper, IMapper mapper, IConfiguration config)
        {
            _repoWrapper = repoWrapper;
            _mapper = mapper;
            _config = config;
        }
        public async Task<UserModel> ValidateUser(string email, string password)
        {
            List<UserModel> users = await _repoWrapper.UserRepository.FindByCondition(x => x.Email == email && x.Password == password && x.IsActive);
            return users.FirstOrDefault();
        }
        public async Task<UserModel> UpdateUserToken(UserModel userModel)
        {            
            if (userModel != null)
            {
                await _repoWrapper.UserRepository.Update(userModel);
            }
            return userModel;
        }
        public async Task<UserModel> GetUSerInfo(string email)
        {
            UserModel userInfo = _repoWrapper.UserRepository.FindByCondition(u => u.Email == email).Result.FirstOrDefault();
            return userInfo;
        }
    }
}
