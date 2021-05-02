using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Hangfire;

using System.Configuration;
using Hangfire.SqlServer;


namespace TicketPlanetV2.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {

            GlobalConfiguration.Configuration
            .UseSqlServerStorage("DefaultConnection", new SqlServerStorageOptions
            {
                CommandBatchMaxTimeout = TimeSpan.FromMinutes(2),
                SlidingInvisibilityTimeout = TimeSpan.FromMinutes(2),
                QueuePollInterval = TimeSpan.Zero,

                UseRecommendedIsolationLevel = true,
                UsePageLocksOnDequeue = true,
                DisableGlobalLocks = true
            }); app.UseHangfireDashboard();

            app.UseHangfireServer();
        }
    }
}