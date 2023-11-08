using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RistDashboard.Api.Entities
{
    public class AppSettings
    {
        public static string JWTIssuer { get; set; }
        public static string JWTKey { get; set; }
        public static string RegisterSecretKey { get; set; }
        public static string Audience { get;set; }
    }
}
