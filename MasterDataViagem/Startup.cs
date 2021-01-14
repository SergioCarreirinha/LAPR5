using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Identity;

using MasterDataViagem.Infrastructure;
using MasterDataViagem.Infrastructure.Trips;
using MasterDataViagem.Infrastructure.PassingTimes;
using MasterDataViagem.Infrastructure.Drivers;
using MasterDataViagem.Infrastructure.DriverDuties;
using MasterDataViagem.Infrastructure.Vehicles;
using MasterDataViagem.Infrastructure.VehicleDuties;
using MasterDataViagem.Infrastructure.WorkBlocks;
using MasterDataViagem.Infrastructure.Genetics;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Infrastructure.ParameterValues;
using MasterDataViagem.Infrastructure.DriverDutyTypes;

using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.User;
using System;
using System.Threading.Tasks;

using MasterDataViagem.Service;
using MasterDataViagem.Repository;

namespace MasterDataViagem
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MDVDbContext>(opt =>
                opt.UseSqlServer(Configuration.GetConnectionString("Connection")).ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            services.AddIdentity<User, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 4;
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
            }).AddEntityFrameworkStores<MDVDbContext>();

            var applicationSettings = Configuration.GetSection("ApplicationSettings");
            services.Configure<ApplicationSettings>(applicationSettings);

            var appSettings = applicationSettings.Get<ApplicationSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);

            services.AddAuthentication(x =>
           {
               x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
               x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
           })
            .AddJwtBearer(x =>
           {
               x.RequireHttpsMetadata = false;
               x.SaveToken = true;
               x.TokenValidationParameters = new TokenValidationParameters
               {
                   ValidateIssuerSigningKey = true,
                   IssuerSigningKey = new SymmetricSecurityKey(key),
                   ValidateIssuer = false,
                   ValidateAudience = false
               };
           });

            ConfigureMyServices(services);

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider serviceProvider)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.ApplyMigrations();

            CreateRoles(serviceProvider).Wait();
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            //Trip
            services.AddTransient<ITripRepository, TripRepository>();
            services.AddTransient<TripService>();
            //PassingTime
            services.AddTransient<IPassingTimeRepository, PassingTimeRepository>();
            services.AddTransient<PassingTimeService>();
            //Driver
            services.AddTransient<IDriverRepository, DriverRepository>();
            services.AddTransient<DriverService>();
            //DriverDuty
            services.AddTransient<IDriverDutyRepository, DriverDutyRepository>();
            services.AddTransient<DriverDutyService>();
            //Vehicle
            services.AddTransient<IVehicleRepository, VehicleRepository>();
            services.AddTransient<VehicleService>();
            //VehicleDuty
            services.AddTransient<IVehicleDutyRepository,VehicleDutyRepository>();
            services.AddTransient<VehicleDutyService>();
            //WorkBlock
            services.AddTransient<IWorkBlockRepository,WorkBlockRepository>();
            services.AddTransient<WorkBlockService>();
            //Genetic
            services.AddTransient<IGeneticRepository,GeneticRepository>();
            services.AddTransient<GeneticService>();
            //Parameters
            services.AddTransient<IParameterValueRepository,ParameterValueRepository>();
            services.AddTransient<ParameterValueService>();
            //DriverDutyType
            services.AddTransient<IDriverDutyTypeRepository,DriverDutyTypeRepository>();
            services.AddTransient<DriverDutyTypeService>();
        }

        private async Task CreateRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            string[] rolesNames = { "Admin", "Client" };
            IdentityResult result;
            foreach (var namesRole in rolesNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(namesRole);
                if (!roleExist)
                {
                    result = await roleManager.CreateAsync(new IdentityRole(namesRole));
                }
            }
        }
    }
}
