using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RiskDashboard.Api.Services.Constants;
using RiskDashboard.Api.Services.ServiceContracts;
using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;
using System.Globalization;
using static RiskDashboardType;

namespace RiskDashboard_RESTAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class RiskDashboardController : ControllerBase
    {
        private IRiskInformationService _riskInformationService;
        private ILog _logger;
        public RiskDashboardController(IRiskInformationService riskInformationService, ILog logger)
        {
            _riskInformationService = riskInformationService;
            _logger = logger;
        }

        //[AllowAnonymous]
        //[HttpPost]
        //public IActionResult Login([FromBody] UserModel login)
        //{
        //    IActionResult response = Unauthorized();
        //    var user = AuthenticateUser(login);

        //    if (user != null)
        //    {
        //        var tokenString = GenerateJSONWebToken(user);
        //        response = Ok(new { token = tokenString });
        //    }

        //    return response;
        //}

        //private string GenerateJSONWebToken(UserModel userInfo)
        //{
        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(_config["Jwt:Issuer"],
        //      _config["Jwt:Issuer"],
        //      null,
        //      expires: DateTime.Now.AddMinutes(1),
        //      signingCredentials: credentials);

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        //private UserModel AuthenticateUser(UserModel login)
        //{
        //    UserModel user = null;

        //    //Validate the User Credentials
        //    //Demo Purpose, I have Passed HardCoded User Information
        //    if (login.Username == "Jignesh")
        //    {
        //        user = new UserModel { Username = "Jignesh Trivedi", EmailAddress = "test.btest@gmail.com" };
        //    }
        //    return user;
        //}

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetProjects()
        {
            try
            {
                List<ProjectDetails> projectDetails = await _riskInformationService.GetProjectDetails();
                return Ok(projectDetails);
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [AllowAnonymous]
        [HttpGet("{startYear}/{startMonth}/{endYear}/{endMonth}/{riskType?}")]
        public async Task<IActionResult> GetRisks(int startYear, int startMonth, int endYear, int endMonth, string? riskType)
        {
            try
            {
                var risks = await _riskInformationService.GetRiskInformation(riskType, startYear, startMonth, endYear, endMonth);
                if (risks == null)
                {
                    return NoContent();
                }
                else
                {
                    return Ok(risks);
                }
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetLastImportedFileDetails()
        {
            List<FileImportDetails> importDetails = await _riskInformationService.GetLastImportedFileDetails();
            return Ok(importDetails);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SaveRisks(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Invalid file.");
            try
            {
                List<string> expectedHeaders = RiskDashboardConstants.ExpectedHeaders.Split(',').ToList(); ;

                bool headersMatch = VerifyCsvHeaders(file, expectedHeaders);

                if (headersMatch)
                {
                    List<RiskDashboardViewModel> riskDetails = ReadRiskDetails(file);
                    if (riskDetails == null || riskDetails.Count == 0)
                    {
                        return Ok("No risk data found in the imported file");
                    }
                    else
                    {
                        bool imported = await _riskInformationService.SaveRiskDetails(riskDetails, file.FileName);
                        return Ok("CSV data imported successfully.");
                    }
                }
                return Ok("Please upload valid Risk information CSV file.");
            }
            catch (Exception ex)
            {
                _logger.Error(ex.ToString());
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        private List<RiskDashboardViewModel> ReadRiskDetails(IFormFile file)
        {
            List<RiskDashboardViewModel> riskDashboardDtls;
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    riskDashboardDtls = csv.GetRecords<RiskDashboardViewModel>().ToList();
                }
            }
            return riskDashboardDtls;
        }
        static bool VerifyCsvHeaders(IFormFile file, List<string> expectedHeaders)
        {
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
                {
                    csv.Read();
                    csv.ReadHeader();

                    var actualHeaders = csv.HeaderRecord.ToList();

                    // Check if all expected headers are present in the actual headers
                    return expectedHeaders.All(header => actualHeaders.Contains(header));
                }
            }
        }
    }
}
