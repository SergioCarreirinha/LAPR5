using MasterDataViagem.Domain.Shared;
using System;

namespace MasterDataViagem.Domain.PassingTime {
    public class PassingTimes : Entity<PassingTimesId> {
        public string key { get; set; } 
        public string Time { get; set; } 
        public string Node { get; set; }
        public bool IsUsed { get; set; }
        public bool IsReliefPoint { get; set; }

        public PassingTimes(string _key, string _time, string _node, bool _isUsed, bool _isReliefPoint){
            this.Id = new PassingTimesId(Guid.NewGuid());
            this.key = _key;
            this.Time = _time;
            this.Node = _node;
            this.IsUsed = _isUsed;
            this.IsReliefPoint = _isReliefPoint;
        }

        protected PassingTimes(){
            //ORM
        }
    }
}