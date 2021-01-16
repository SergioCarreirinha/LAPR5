using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.DriverDutyTypes;

namespace MasterDataViagem.Infrastructure.DriverDutyTypes
{
    internal class DriverDutyTypeEntityTypeConfiguration : IEntityTypeConfiguration<DriverDutyType>
    {
        public void Configure(EntityTypeBuilder<DriverDutyType> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}