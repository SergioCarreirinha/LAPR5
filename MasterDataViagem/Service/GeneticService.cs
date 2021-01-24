using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Genetics;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service
{
    public class GeneticService
    {
        private readonly IGeneticRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public GeneticService(IGeneticRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IGeneticDTO>> Get(){
            var list = await this._repo.getAllGenetics();

            List<IGeneticDTO> listDTO = list.ConvertAll<IGeneticDTO>( genetic => GeneticMapper.domainToDTO(genetic));
            
            return listDTO;
        }
        public async Task<IGeneticDTO> GetById(GeneticId id){

            var genetic =  await this._repo.GetByIdAsync(id);

            if(genetic == null) return null;

            return GeneticMapper.domainToDTO(genetic);
        }

        public async Task<IGeneticDTO> Create(CGeneticDTO genetic)
        {
            var obj = GeneticMapper.cDtoToDomain(genetic);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return GeneticMapper.domainToDTO(obj);
        }

        public async Task<IGeneticDTO> CreateWithoutVerifications(IGeneticDTO genetic)
        {
            var obj = GeneticMapper.dtoToDomain(genetic);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return GeneticMapper.domainToDTO(obj);
        }

        public async Task<IGeneticDTO> DeleteAsync(GeneticId id)
        {
            var genetic = await this._repo.GetByIdAsync(id); 

            if (genetic == null)
                return null;   

            
            this._repo.Remove(genetic);
            await this._unitOfWork.CommitAsync();

            return GeneticMapper.domainToDTO(genetic);
        }
    }
}