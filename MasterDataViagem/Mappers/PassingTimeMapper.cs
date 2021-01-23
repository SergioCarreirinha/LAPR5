using MasterDataViagem.DTO;
using MasterDataViagem.Domain.PassingTimes;

namespace MasterDataViagem.Mappers {
    public class PassingTimeMapper {
        public static IPassingTimeDTO domainToDTO(PassingTime vd) {
            return new IPassingTimeDTO {
                Id = vd.Id.AsGuid(),
                key = vd.key,
                Time = vd.Time,
                Node = vd.Node,
                IsUsed = vd.IsUsed,
                IsReliefPoint = vd.IsReliefPoint
            };
        }

        public static PassingTime dtoToDomain(IPassingTimeDTO vd) {
            return new PassingTime(vd.key, vd.Time, vd.Node, vd.IsUsed, vd.IsReliefPoint);
        }
    }
}