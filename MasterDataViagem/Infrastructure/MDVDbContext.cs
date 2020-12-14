using Microsoft.EntityFrameworkCore;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Infrastructure.Trips;

namespace MasterDataViagem.Infrastructure
{
    public class MDVDbContext : DbContext
    {
        public DbSet<Trip> Trips { get; set; }

        public MDVDbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TripEntityTypeConfiguration());
        }
    }
}