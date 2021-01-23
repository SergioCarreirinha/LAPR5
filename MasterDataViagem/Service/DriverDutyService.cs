using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using System;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDuties;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service
{
    public class DriverDutyService
    {
        private readonly IDriverDutyRepository _repo;
        private readonly IWorkBlockRepository _repoWb;
        private readonly IUnitOfWork _unitOfWork;

        public DriverDutyService(IDriverDutyRepository repo,IWorkBlockRepository repoWb, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
            this._repoWb = repoWb;
        }

        public async Task<List<IDriverDutyDTO>> Get(){
            var list = await this._repo.getAllDriverDuties();

            List<IDriverDutyDTO> listDTO = list.ConvertAll<IDriverDutyDTO>( driverDuty => DriverDutyMapper.domainToDTO(driverDuty));
            
            return listDTO;
        }
        public async Task<IDriverDutyDTO> GetById(DriverDutyId id){

            var driverDuty =  await this._repo.GetByIdAsync(id);

            if(driverDuty == null) return null;

            return DriverDutyMapper.domainToDTO(driverDuty);
        }
        public async Task<IDriverDutyDTO> Create(CDriverDutyDTO dto)
        {
            
            var obj = DriverDutyMapper.cDtoToDomain(dto,this._repoWb);

            if (!(await this._repo.getByKey(dto.key))) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return DriverDutyMapper.domainToDTO(obj);
            }else{
                return null;
            }
            
        }

        public async Task<IDriverDutyDTO> CreateWithoutVerifications(IDriverDutyDTO driverDuty)
        {
            var obj = DriverDutyMapper.dtoToDomain(driverDuty);

            await this._repo.AddAsync(obj);

            await this._unitOfWork.CommitAsync();

            return DriverDutyMapper.domainToDTO(obj);
        }

        public async Task<IDriverDutyDTO> DeleteAsync(DriverDutyId id)
        {
            var driverDuty = await this._repo.GetByIdAsync(id); 

            if (driverDuty == null)
                return null;   

            
            this._repo.Remove(driverDuty);
            await this._unitOfWork.CommitAsync();

            return DriverDutyMapper.domainToDTO(driverDuty);
        }
    }
}