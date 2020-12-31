using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.Trip;

namespace MasterDataViagem.Infrastructure.Trips
{
    internal class TripEntityTypeConfiguration : IEntityTypeConfiguration<Tripes>
    {
        public void Configure(EntityTypeBuilder<Tripes> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}