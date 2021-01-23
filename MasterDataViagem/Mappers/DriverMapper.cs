using MasterDataViagem.DTO;
using MasterDataViagem.Domain.Driver;

namespace MasterDataViagem.Mappers {
    public class DriverMapper {
        public static IDriverDTO domainToDTO(Driver vd) {
            return new IDriverDTO {
                Id = vd.Id.AsGuid(),
                name = vd.name,
                birthdate = vd.birthdate,
                driverLicenseNum = vd.driverLicenseNum,
                licenseExpiration = vd.licenseExpiration
            };
        }

        public static Driver dtoToDomain(IDriverDTO vd) {
            return new Driver(vd.name, vd.birthdate, vd.driverLicenseNum, vd.licenseExpiration);
        }
    }
}