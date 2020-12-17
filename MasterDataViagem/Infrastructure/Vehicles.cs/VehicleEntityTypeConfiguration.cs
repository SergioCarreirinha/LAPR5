using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.Vehicle;

namespace MasterDataViagem.Infrastructure.Vehicles
{
    internal class VehicleEntityTypeConfiguration : IEntityTypeConfiguration<Vehicle>
    {
        public void Configure(EntityTypeBuilder<Vehicle> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}