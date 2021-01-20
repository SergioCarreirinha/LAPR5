using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Genetics;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace MasterDataViagem.Repository
{
    public interface IGeneticRepository: IRepository<Genetic, GeneticId>
    {
        Task<List<Genetic>> getAllGenetics();
    }
}