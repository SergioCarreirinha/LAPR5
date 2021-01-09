using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.DriverDuties;

namespace MasterDataViagem.Infrastructure.DriverDuties
{
    internal class DriverDutyEntityTypeConfiguration : IEntityTypeConfiguration<DriverDuty>
    {
        public void Configure(EntityTypeBuilder<DriverDuty> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}