USE [Risk_Dashboard]
GO

/****** Object:  Table [dbo].[ProjectDetails]    Script Date: 10/03/2023 12:55:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ProjectDetails](
	[Id] [uniqueidentifier] NOT NULL,
	[ProjectName] [varchar](500) NULL,
	[ProjectCode] [varchar](250) NULL,
	[Practice] [varchar](50) NULL,
	[Owner] [varchar](200) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
 CONSTRAINT [PK_ProjectDetails_id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ProjectDetails] ADD  CONSTRAINT [DF_ProjectDetails_id]  DEFAULT (newid()) FOR [Id]
GO

---------------------------------------------------------------------------------------
CREATE TABLE [dbo].[FileImportDetails](
	[Id] [uniqueidentifier] NOT NULL,
	FileName varchar(100), 
	ImportedDate datetime, 
	NoOfRecordsCreated int, 
	NoOfRecordsUpdated int, 
	ErrorDetails varchar(max), 
	UpdatedBy UniqueIdentifier
 CONSTRAINT [PK_FileImportDetails_id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[FileImportDetails] ADD CONSTRAINT [DF_FileImportDetails_id]  DEFAULT (newid()) FOR [Id]
GO
---------------------------------------------------------------------------------------

USE [Risk_Dashboard]
GO

/****** Object:  Table [dbo].[RiskInformation]    Script Date: 10/03/2023 12:55:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[RiskInformation](
	[Id] [uniqueidentifier] NOT NULL,
	[ProjectDetailsId] [uniqueidentifier] NOT NULL,
	[RiskId] [int] NULL,
	[Type] [varchar](100) NULL,
	[SubType] [varchar](100) NULL,
	[IdentifiedDate] [datetime] NULL,
	[Description] [varchar](max) NULL,
	[Vulnerability] [varchar](max) NULL,
	[RiskSource] [varchar](250) NULL,
	[ImpactedAreas] [varchar](max) NULL,
	[InformationAssetImpacted] [varchar](1000) NULL,
	[ExistingControl] [varchar](max) NULL,
	[Location] [varchar](500) NULL,
	[Status] [varchar](50) NULL,
	[AnalysisProbability] [int] NULL,
	[AnalysisImpact] [int] NULL,
	[RiskRating] [varchar](50) NULL,
	[RiskResponse] [varchar](50) NULL,
	[NewControls] [varchar](500) NULL,
	[ContingencyPlan] [varchar](max) NULL,
	[MitigationPlan] [varchar](max) NULL,
	[RelatedPolicy] [varchar](200) NULL,
	[RTP] [varchar](100) NULL,
	[OccurrenceCount] [int] NULL,
	[ReviewProbability] [int] NULL,
	[ReviewImpact] [int] NULL,
	[ReviewRating] [varchar](50) NULL,
	[Remarks] [varchar](max) NULL,
 CONSTRAINT [PK_RiskInformation] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

ALTER TABLE [dbo].[RiskInformation] ADD  CONSTRAINT [DF_RiskInformation_Id]  DEFAULT (newsequentialid()) FOR [Id]
GO

ALTER TABLE [dbo].[RiskInformation]  WITH CHECK ADD  CONSTRAINT [FK_RiskInformation_ProjectDetailsId] FOREIGN KEY([ProjectDetailsId])
REFERENCES [dbo].[ProjectDetails] ([Id])
GO

ALTER TABLE [dbo].[RiskInformation] CHECK CONSTRAINT [FK_RiskInformation_ProjectDetailsId]
GO
--------------------------------------------------------------------------------------------------
Create Procedure Sp_GetProjectIds
As
Begin
	Select Id, ProjectCode As [UniqueId] From ProjectDetails
End;
--------------------------------------------------------------------------------------------------
Create Procedure Sp_GetRiskIds
As
Begin
	Select Id, Cast(RiskId as varchar) As [UniqueId] From RiskInformation
End;
--------------------------------------------------------------------------------------------------
Create Procedure Sp_GetLastImportedFileDetails
As
Begin
	Select Top 1 * From FileImportDetails Order by ImportedDate Desc
End;
--------------------------------------------------------------------------------------------------
USE [Risk_Dashboard]
GO

/****** Object:  Table [dbo].[Users]    Script Date: 11/08/2023 13:29:10 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users](
	[Id] [uniqueidentifier] NOT NULL,
	[FirstName] [varchar](500) NULL,
	[LastName] [varchar](250) NULL,
	[Email] [varchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[Password] [nvarchar](1024) NULL,
	[IsActive] [bit] NULL,
	[AuthToken] [nvarchar](1024) NULL,
	[TokenExpiryTime] [datetime] NULL,
 CONSTRAINT [PK_Users_id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Users] ADD  CONSTRAINT [DF_Users_id]  DEFAULT (newid()) FOR [Id]
GO

ALTER TABLE [dbo].[Users] ADD  DEFAULT ('TRUE') FOR [IsActive]
GO
-------------------------------------------------------------------------------------------------------------


