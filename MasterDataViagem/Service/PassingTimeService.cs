using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service {

    public class PassingTimeService
    {
        private readonly IPassingTimeRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public PassingTimeService(IPassingTimeRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IPassingTimeDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IPassingTimeDTO> listDTO = list.ConvertAll<IPassingTimeDTO>( times => PassingTimeMapper.domainToDTO(times));
            
            return listDTO;
        }
        public async Task<IPassingTimeDTO> GetById(PassingTimeId id){

            var times =  await this._repo.GetByIdAsync(id);

            if(times == null) return null;

            return PassingTimeMapper.domainToDTO(times);
        }

        public async Task<IPassingTimeDTO> Create(IPassingTimeDTO times)
        {
            var obj = PassingTimeMapper.dtoToDomain(times);

            if (!(await this._repo.getByKey(times.key))) {

                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return PassingTimeMapper.domainToDTO(obj);
            } else {
                return null;
            }
        }

        public async Task<IPassingTimeDTO> CreateWithoutVerifications(IPassingTimeDTO times)
        {
            var obj = PassingTimeMapper.dtoToDomain(times);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return PassingTimeMapper.domainToDTO(obj);
        }

        public async Task<IPassingTimeDTO> DeleteAsync(PassingTimeId id)
        {
            var times = await this._repo.GetByIdAsync(id); 

            if (times == null)
                return null;   

            
            this._repo.Remove(times);
            await this._unitOfWork.CommitAsync();

            return PassingTimeMapper.domainToDTO(times);
        }
    }
}