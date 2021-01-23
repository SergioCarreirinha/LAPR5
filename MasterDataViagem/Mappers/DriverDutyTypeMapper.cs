using MasterDataViagem.DTO;
using MasterDataViagem.Domain.DriverDutyTypes;

namespace MasterDataViagem.Mappers {
    public class DriverDutyTypeMapper {
        public static IDriverDutyTypeDTO domainToDTO(DriverDutyType vd) {
            return new IDriverDutyTypeDTO {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                name = vd.name,
                parameters = vd.parameters
            };
        }

        public static DriverDutyType dtoToDomain(IDriverDutyTypeDTO vd) {
            return new DriverDutyType(vd.key, vd.name, vd.parameters);
        }
    }
}