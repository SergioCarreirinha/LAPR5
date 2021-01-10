using MasterDataViagem.Domain.Genetics;
using MasterDataViagem.Infrastructure.Shared;
using MasterDataViagem.Repository;

namespace MasterDataViagem.Infrastructure.Genetics
{
    public class GeneticRepository : BaseRepository<Genetic, GeneticId>, IGeneticRepository
    {
    
        public GeneticRepository(MDVDbContext context):base(context.Genetics)
        {
           
        }


    }
}