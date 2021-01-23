using MasterDataViagem.DTO;
using MasterDataViagem.Domain.ParameterValues;

namespace MasterDataViagem.Mappers {
    public class ParameterValueMapper {
        public static IParameterValueDTO domainToDTO(ParameterValue vd) {
            return new IParameterValueDTO {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                parameter = vd.parameter,
                value = vd.value
            };
        }

        public static ParameterValue dtoToDomain(IParameterValueDTO vd) {
            return new ParameterValue(vd.key, vd.parameter, vd.value);
        }
    }
}