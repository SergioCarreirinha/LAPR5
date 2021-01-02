using MasterDataViagem.Domain.Shared;
using System;

namespace MasterDataViagem.Domain.PassingTimes {
    public class IPassingTimeDTO {
        public Guid Id { get; set; }
        public string key { get; set; } 
        public string Time { get; set; } 
        public string Node { get; set; }
        public bool IsUsed { get; set; }
        public bool IsReliefPoint { get; set; }
    }
}