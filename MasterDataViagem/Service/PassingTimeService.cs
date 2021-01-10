using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTimes;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;

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

            List<IPassingTimeDTO> listDTO = list.ConvertAll<IPassingTimeDTO>( times => new IPassingTimeDTO
            { 
                Id = times.Id.AsGuid(), 
                key = times.key,
                Time = times.Time,
                Node = times.Node,
                IsUsed = times.IsUsed,
                IsReliefPoint = times.IsReliefPoint
            });
            
            return listDTO;
        }
        public async Task<IPassingTimeDTO> GetById(PassingTimeId id){

            var times =  await this._repo.GetByIdAsync(id);

            if(times == null) return null;

            return new IPassingTimeDTO
            {
                Id = times.Id.AsGuid(),
                key = times.key,
                Time = times.Time,
                Node = times.Node,
                IsUsed = times.IsUsed,
                IsReliefPoint = times.IsReliefPoint
            };
        }

        public async Task<IPassingTimeDTO> Create(IPassingTimeDTO times)
        {
            var obj = new PassingTime(times.key, times.Time, times.Node, times.IsUsed, times.IsReliefPoint);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return new IPassingTimeDTO
            {
                Id = obj.Id.AsGuid(),
                key = obj.key,
                Time = obj.Time,
                Node = obj.Node,
                IsUsed = obj.IsUsed,
                IsReliefPoint = obj.IsReliefPoint
            };
        }

        public async Task<IPassingTimeDTO> DeleteAsync(PassingTimeId id)
        {
            var times = await this._repo.GetByIdAsync(id); 

            if (times == null)
                return null;   

            
            this._repo.Remove(times);
            await this._unitOfWork.CommitAsync();

            return new IPassingTimeDTO
            {
                Id = times.Id.AsGuid(),
                key = times.key,
                Time = times.Time,
                Node = times.Node,
                IsUsed = times.IsUsed,
                IsReliefPoint = times.IsReliefPoint
            };
        }
    }
}