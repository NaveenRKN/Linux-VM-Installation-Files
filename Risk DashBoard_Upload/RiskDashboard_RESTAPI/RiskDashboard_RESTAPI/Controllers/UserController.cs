using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RiskDashboard.Api.Services.ServiceContracts;
using RiskDashboard.Api.Services.Services;
using RiskDashboard_RESTAPI.Models;
using RistDashboard.Api.Entities;
using RistDashboard.Api.Entities.Models;
using System.Security.Claims;

namespace RiskDashboard_RESTAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private ILog _logger;
        private readonly ITokenService _tokenService;
        public UserController(IUserService userService, ILog logger, ITokenService tokenService)
        {
            _userService = userService;
            _logger = logger;
            _tokenService = tokenService;
        }
        /// <summary>
        /// Authenticate user and generate oauth token
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> AuthenticateUser()
        {
            try
            {
                //IFormCollection requestForm = await Request.ReadFormAsync();
                //string emailId = requestForm["emailId"].ToString();
                //string password = requestForm["password"].ToString();

                //UserModel userIdentityViewModel = await _userService.ValidateUser(emailId, password);
                //if (userIdentityViewModel == null)
                //{
                //    return Unauthorized("Incorrect username or password!");
                //}
                //var token = await _userService.GenerateJWTTokens(userIdentityViewModel.FirstName + " " + userIdentityViewModel.LastName);

                //if (token == null)
                //{
                //    return Unauthorized("Invalid Attempt!");
                //}
                //UserModel obj = new UserModel
                //{
                //    AuthToken = token.Refresh_Token
                //};
                //return Ok(userIdentityViewModel);
                IFormCollection requestForm = await Request.ReadFormAsync();
                string emailId = requestForm["emailId"].ToString();
                string password = requestForm["password"].ToString();

                var user = await _userService.ValidateUser(emailId, password);
                if (user is null)
                    return Unauthorized("Incorrect username or password!");
                
                var accessToken = await _tokenService.GenerateNewAccessToken(user);
                var refreshToken = await _tokenService.GenerateRefreshToken();

                UserModel userModel = await _userService.GetUSerInfo(emailId);
                userModel.AuthToken = refreshToken.ToString();
                userModel.TokenExpiryTime = DateTime.Now.AddDays(7);

                await _userService.UpdateUserToken(userModel);

                return Ok(new AuthenticatedResponse
                {
                    AceessToken = accessToken,
                    RefreshToken = refreshToken
                });
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Refresh(TokenApiModel tokenApiModel)
        {
            try
            {
                if (tokenApiModel is null)
                    return BadRequest("Invalid request");
                var authenticatedResponse = await _tokenService.VerifyRefreshTokenAndReGenerate(tokenApiModel.RefreshToken);
                //var username = principal.Identity.Name; //this is mapped to the Name claim by default

                //var user = await _userService.GetUSerInfo(username);

                //if (user is null || user.AuthToken != refreshToken || user.TokenExpiryTime <= DateTime.Now)
                //    return BadRequest("Invalid request");

                //var newAccessToken = await _tokenService.GenerateAccessToken(principal.Claims);
                //var newRefreshToken = await _tokenService.GenerateRefreshToken();
                //user.AuthToken = newRefreshToken.ToString();
                //await _userService.UpdateUserToken(user);

                if (authenticatedResponse == null)
                {
                    return NoContent();
                }
                else
                {
                    return Ok(authenticatedResponse);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
