using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagem.Infrastructure.PassingTimes
{
    internal class PassingTimeEntityTypeConfiguration : IEntityTypeConfiguration<PassingTime>
    {
        public void Configure(EntityTypeBuilder<PassingTime> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}