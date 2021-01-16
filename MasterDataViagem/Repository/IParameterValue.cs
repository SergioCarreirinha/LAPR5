using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.ParameterValues;

namespace MasterDataViagem.Repository
{
    public interface IParameterValueRepository : IRepository<ParameterValue, ParameterValueId>
    {
        bool getByKey(string key);
    }
}