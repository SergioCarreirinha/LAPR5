using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.PassingTime;

namespace MasterDataViagem.Domain.WorkBlocks
{
    public class WorkBlockService
    {
        private readonly IWorkBlockRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public WorkBlockService(IWorkBlockRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IWorkBlockDTO>> Get()
        {
            var list = await this._repo.GetAllAsync();

            List<IWorkBlockDTO> listDTO = list.ConvertAll<IWorkBlockDTO>(workBlock => new IWorkBlockDTO
            {
                Id = workBlock.Id.AsGuid(),
                key = workBlock.key,
                startTime = workBlock.startTime,
                endTime = workBlock.endTime,
                startNode = workBlock.startNode,
                endNode = workBlock.endNode,
                isCrewTravelTime = workBlock.isCrewTravelTime,
                isActive = workBlock.isActive
            });

            return listDTO;
        }
        public async Task<IWorkBlockDTO> GetById(WorkBlockId id)
        {

            var workBlock = await this._repo.GetByIdAsync(id);

            if (workBlock == null) return null;

            return new IWorkBlockDTO
            {
                Id = workBlock.Id.AsGuid(),
                key = workBlock.key,
                startTime = workBlock.startTime,
                endTime = workBlock.endTime,
                startNode = workBlock.startNode,
                endNode = workBlock.endNode,
                isCrewTravelTime = workBlock.isCrewTravelTime,
                isActive = workBlock.isActive
            };
        }
        public async Task<IWorkBlockDTO> Create(IWorkBlockDTO workBlock)
        {
            var obj = new WorkBlock(workBlock.key, workBlock.startTime, workBlock.endTime, 
            workBlock.startNode, workBlock.endNode, workBlock.isCrewTravelTime, workBlock.isActive);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return new IWorkBlockDTO
            {
                Id = obj.Id.AsGuid(),
                key = workBlock.key,
                startTime = workBlock.startTime,
                endTime = workBlock.endTime,
                startNode = workBlock.startNode,
                endNode = workBlock.endNode,
                isCrewTravelTime = workBlock.isCrewTravelTime,
                isActive = workBlock.isActive
            };
        }

        public async Task<IWorkBlockDTO> DeleteAsync(WorkBlockId id)
        {
            var workBlock = await this._repo.GetByIdAsync(id);

            if (workBlock == null)
                return null;


            this._repo.Remove(workBlock);
            await this._unitOfWork.CommitAsync();

            return new IWorkBlockDTO
            {
                Id = workBlock.Id.AsGuid(),
                key = workBlock.key,
                startTime = workBlock.startTime,
                endTime = workBlock.endTime,
                startNode = workBlock.startNode,
                endNode = workBlock.endNode,
                isCrewTravelTime = workBlock.isCrewTravelTime,
                isActive = workBlock.isActive
            };
        }
    }
}