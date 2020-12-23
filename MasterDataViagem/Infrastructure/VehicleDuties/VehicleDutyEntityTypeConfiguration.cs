using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.VehicleDuties;

namespace MasterDataViagem.Infrastructure.VehicleDuties
{
    internal class VehicleDutyEntityTypeConfiguration : IEntityTypeConfiguration<VehicleDuty>
    {
        public void Configure(EntityTypeBuilder<VehicleDuty> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}