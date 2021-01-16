using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Service
{
    public class WorkBlockService
    {
        private readonly IWorkBlockRepository _repo;
        private readonly ITripRepository _repoTp;
        private readonly IUnitOfWork _unitOfWork;

        public WorkBlockService(IWorkBlockRepository repo, IUnitOfWork unitOfWork, ITripRepository repoTp)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
            this._repoTp = repoTp;
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
                isActive = workBlock.isActive,
                trips = workBlock.trips
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
        public async Task<IWorkBlockDTO> Create(CWorkBlockDTO workBlock)
        {
            List<Tripes> tripsList = new List<Tripes>();
            foreach (var tp in workBlock.trips)
            {

                if (tp != null)
                {

                    
                    Tripes tripId = new Tripes(tp);
                    Tripes l = this._repoTp.GetByIdAsync(tripId.Id).Result;
                    tripsList.Add(l);

                }
            }

            var obj = new WorkBlock(workBlock.key, workBlock.startTime, workBlock.endTime,
            workBlock.startNode, workBlock.endNode, workBlock.isCrewTravelTime, workBlock.isActive, tripsList);
            
            if (!(await this._repo.getByKey(workBlock.key))) {
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
                    isActive = workBlock.isActive,
                    trips = tripsList
                };
            } else {
                return null;
            }
        }

        public async Task<IWorkBlockDTO> CreateWithoutVerifications(IWorkBlockDTO workBlock)
        {   
            
            var obj = new WorkBlock(workBlock.key, workBlock.startTime, workBlock.endTime,
            workBlock.startNode, workBlock.endNode, workBlock.isCrewTravelTime, workBlock.isActive, workBlock.trips);
            
        
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
                isActive = workBlock.isActive,
                trips = workBlock.trips
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
                isActive = workBlock.isActive,
                trips = workBlock.trips
            };
        }
    }
}