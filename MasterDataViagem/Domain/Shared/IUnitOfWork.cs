using System.Threading.Tasks;

namespace MasterDataViagem.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}