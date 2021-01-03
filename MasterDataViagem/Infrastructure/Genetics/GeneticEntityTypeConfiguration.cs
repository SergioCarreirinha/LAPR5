using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.Genetics;

namespace MasterDataViagem.Infrastructure.Genetics
{
    internal class GeneticEntityTypeConfiguration : IEntityTypeConfiguration<Genetic>
    {
        public void Configure(EntityTypeBuilder<Genetic> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}