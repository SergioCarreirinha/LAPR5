using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.WorkBlocks;
using MasterDataViagem.Mappers;

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

            List<IWorkBlockDTO> listDTO = list.ConvertAll<IWorkBlockDTO>(workBlock => WorkBlockMapper.domainToDTO(workBlock));

            return listDTO;
        }
        public async Task<IWorkBlockDTO> GetById(WorkBlockId id)
        {

            var workBlock = await this._repo.GetByIdAsync(id);

            if (workBlock == null) return null;

            return WorkBlockMapper.domainToDTO(workBlock);
        }
        public async Task<IWorkBlockDTO> Create(CWorkBlockDTO workBlock)
        {

            var obj = WorkBlockMapper.cDtoToDomain(workBlock,this._repoTp);
            
            if (!(await this._repo.getByKey(workBlock.key))) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return WorkBlockMapper.domainToDTO(obj);
            } else {
                return null;
            }
        }

        public async Task<IWorkBlockDTO> CreateWithoutVerifications(IWorkBlockDTO workBlock)
        {   
            
            var obj = WorkBlockMapper.dtoToDomain(workBlock);
            
        
            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return WorkBlockMapper.domainToDTO(obj);
        }

        public async Task<IWorkBlockDTO> DeleteAsync(WorkBlockId id)
        {
            var workBlock = await this._repo.GetByIdAsync(id);

            if (workBlock == null)
                return null;


            this._repo.Remove(workBlock);
            await this._unitOfWork.CommitAsync();

            return WorkBlockMapper.domainToDTO(workBlock);
        }
    }
}