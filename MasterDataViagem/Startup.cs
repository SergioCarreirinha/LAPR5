using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

using MasterDataViagem.Infrastructure;
using MasterDataViagem.Infrastructure.Trips;
using MasterDataViagem.Infrastructure.Drivers;
using MasterDataViagem.Infrastructure.Vehicles;
using MasterDataViagem.Infrastructure.Shared;

using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Domain.Vehicle;

namespace MasterDataViagem
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
        {
            options.AddPolicy(name: MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200"/*, para mais urls */).AllowAnyHeader().AllowAnyMethod();
                });
            });
            services.AddDbContext<MDVDbContext>(opt => 
                opt.UseSqlServer(Configuration.GetConnectionString("Connection")).ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());

            ConfigureMyServices(services);

            services.AddControllers().AddNewtonsoftJson();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(MyAllowSpecificOrigins);

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<IUnitOfWork,UnitOfWork>();

            //Trip
            services.AddTransient<ITripRepository,TripRepository>();
            services.AddTransient<TripService>();
            //Driver
            services.AddTransient<IDriverRepository,DriverRepository>();
            services.AddTransient<DriverService>();
            //Vehicle
            services.AddTransient<IVehicleRepository,VehicleRepository>();
            services.AddTransient<VehicleService>();
        }
    }
}
