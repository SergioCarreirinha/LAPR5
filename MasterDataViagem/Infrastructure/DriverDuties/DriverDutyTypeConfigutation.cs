using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.DriverDuty;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    internal class DriverDutyEntityTypeConfiguration : IEntityTypeConfiguration<Driver>
    {
        public void Configure(EntityTypeBuilder<Driver> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}