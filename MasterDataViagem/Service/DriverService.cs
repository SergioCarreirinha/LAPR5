using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Driver;
using MasterDataViagem.Mappers;

namespace MasterDataViagem.Service
{
    public class DriverService
    {
        private readonly IDriverRepository _repo;
        private readonly IUnitOfWork _unitOfWork;

        public DriverService(IDriverRepository repo, IUnitOfWork unitOfWork)
        {
            this._repo = repo;
            this._unitOfWork = unitOfWork;
        }

        public async Task<List<IDriverDTO>> Get(){
            var list = await this._repo.GetAllAsync();

            List<IDriverDTO> listDTO = list.ConvertAll<IDriverDTO>( driver => DriverMapper.domainToDTO(driver));
            
            return listDTO;
        }
        public async Task<IDriverDTO> GetById(DriverId id){

            var driver =  await this._repo.GetByIdAsync(id);

            if(driver == null) return null;

            return DriverMapper.domainToDTO(driver);
        }
        public async Task<IDriverDTO> Create(IDriverDTO driver)
        {
            var obj = DriverMapper.dtoToDomain(driver);

            if (!(await this._repo.getByLicense(driver.driverLicenseNum))) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return DriverMapper.domainToDTO(obj);
            }else {
                return null;
            }
        }

        public async Task<IDriverDTO> DeleteAsync(DriverId id)
        {
            var driver = await this._repo.GetByIdAsync(id); 

            if (driver == null)
                return null;   

            
            this._repo.Remove(driver);
            await this._unitOfWork.CommitAsync();

            return DriverMapper.domainToDTO(driver);
        }
    }
}