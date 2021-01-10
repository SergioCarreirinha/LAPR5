using System.Threading.Tasks;
using System.Collections.Generic;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Repository;
using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Driver;

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

            List<IDriverDTO> listDTO = list.ConvertAll<IDriverDTO>( driver => new IDriverDTO{ 
                Id = driver.Id.AsGuid(),
                name = driver.name,
                birthdate = driver.birthdate,
                driverLicenseNum = driver.driverLicenseNum,
                licenseExpiration = driver.licenseExpiration,
                //driverTypes = driver.driverTypes
            });
            
            return listDTO;
        }
        public async Task<IDriverDTO> GetById(DriverId id){

            var driver =  await this._repo.GetByIdAsync(id);

            if(driver == null) return null;

            return new IDriverDTO{ 
                Id = driver.Id.AsGuid(),
                name = driver.name,
                birthdate = driver.birthdate,
                driverLicenseNum = driver.driverLicenseNum,
                licenseExpiration = driver.licenseExpiration,
                //driverTypes = driver.driverTypes
            };
        }
        public async Task<IDriverDTO> Create(IDriverDTO driver)
        {
            var obj = new Driver(driver.name, driver.birthdate, driver.driverLicenseNum, driver.licenseExpiration /*,driver.driverTypes*/);

            if (!this._repo.getByLicense(driver.driverLicenseNum)) {
                await this._repo.AddAsync(obj);

                await this._unitOfWork.CommitAsync();

                return new IDriverDTO{ 
                        Id = obj.Id.AsGuid(),
                        name = obj.name,
                        birthdate = obj.birthdate,
                        driverLicenseNum = obj.driverLicenseNum,
                        licenseExpiration = obj.licenseExpiration,
                        //driverTypes = driver.driverTypes
            };
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

            return new IDriverDTO{ 
                Id = driver.Id.AsGuid(),
                name = driver.name,
                birthdate = driver.birthdate,
                driverLicenseNum = driver.driverLicenseNum,
                licenseExpiration = driver.licenseExpiration,
                //driverTypes = driver.driverTypes
            };
        }
    }
}