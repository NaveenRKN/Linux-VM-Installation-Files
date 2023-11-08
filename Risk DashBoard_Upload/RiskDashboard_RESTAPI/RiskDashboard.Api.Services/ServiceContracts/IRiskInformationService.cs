using RistDashboard.Api.Entities.Models;
using RistDashboard.Api.Entities.ViewModel;

namespace RiskDashboard.Api.Services.ServiceContracts
{
    public interface IRiskInformationService
    {
        Task<List<FileImportDetails>> GetLastImportedFileDetails();
        Task<List<ProjectDetails>> GetProjectDetails();
        Task<List<RiskInformation>?> GetRiskInformation(string? riskType, int startYear, int startMonth, int endYear, int endMonth);
        Task<bool> SaveRiskDetails(List<RiskDashboardViewModel> riskDetails, string fileName);
    }
}
