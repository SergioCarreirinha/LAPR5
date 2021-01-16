using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.ParameterValues;
using System.Threading.Tasks;

namespace MasterDataViagem.Repository
{
    public interface IParameterValueRepository : IRepository<ParameterValue, ParameterValueId>
    {
        Task<bool> getByKey(string key);
    }
}