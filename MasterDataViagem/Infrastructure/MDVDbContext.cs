using Microsoft.EntityFrameworkCore;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Infrastructure.Trips;
using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Drivers;
using MasterDataViagem.Domain.Vehicle;
using MasterDataViagem.Infrastructure.Vehicles;
using MasterDataViagem.Domain.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace MasterDataViagem.Infrastructure
{
    public class MDVDbContext : IdentityDbContext<User>
    {

        public DbSet<Trip> Trips { get; set; }

        public DbSet<Driver> Drivers { get; set; }

        public DbSet<Vehicle> Vehicles { get; set; }

        public MDVDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Trip
            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());
            //Driver
            modelBuilder.ApplyConfiguration(new DriverEntityTypeConfiguration());
            //Vehicle
            modelBuilder.ApplyConfiguration(new VehicleEntityTypeConfiguration());
        }
    }
}