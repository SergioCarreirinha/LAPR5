using Microsoft.EntityFrameworkCore;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Infrastructure.Trips;
using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Infrastructure.Drivers;

namespace MasterDataViagem.Infrastructure
{
    public class MDVDbContext : DbContext
    {

        public DbSet<Trip> Trips { get; set; }

        public DbSet<Driver> Drivers { get; set; }

        public MDVDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new DriverEntityTypeConfiguration());
        }
    }
}