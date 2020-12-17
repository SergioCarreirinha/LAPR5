using MasterDataViagem.Domain.Shared;
using System;

namespace MasterDataViagem.Domain.PassingTime {
    public class IPassingTimesDTO {
        public string key { get; set; } 
        public string Time { get; set; } 
        public string Node { get; set; }
        public bool IsUsed { get; set; }
        public bool IsReliefPoint { get; set; }
    }
}