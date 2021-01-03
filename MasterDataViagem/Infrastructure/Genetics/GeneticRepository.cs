using MasterDataViagem.Domain.Genetics;
using MasterDataViagem.Infrastructure.Shared;

namespace MasterDataViagem.Infrastructure.Genetics
{
    public class GeneticRepository : BaseRepository<Genetic, GeneticId>, IGeneticRepository
    {
    
        public GeneticRepository(MDVDbContext context):base(context.Genetics)
        {
           
        }


    }
}