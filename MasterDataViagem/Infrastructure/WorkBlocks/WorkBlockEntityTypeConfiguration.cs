using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MasterDataViagem.Domain.WorkBlock;

namespace MasterDataViagem.Infrastructure.WorkBlocks
{
    internal class WorkBlockEntityTypeConfiguration : IEntityTypeConfiguration<WorkBlock>
    {
        public void Configure(EntityTypeBuilder<WorkBlock> builder)
        {
            //builder.ToTable("Categories", SchemaNames.DDDSample1);
            builder.HasKey(b => b.Id);
            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}