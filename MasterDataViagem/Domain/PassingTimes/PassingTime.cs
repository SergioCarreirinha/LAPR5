using MasterDataViagem.Domain.Shared;
using System;

namespace MasterDataViagem.Domain.PassingTimes {
    public class PassingTime : Entity<PassingTimeId>, IAggregateRoot {
        public string key { get; set; } 
        public string Time { get; set; } 
        public string Node { get; set; }
        public bool IsUsed { get; set; }
        public bool IsReliefPoint { get; set; }

        public PassingTime(string _key, string _time, string _node, bool _isUsed, bool _isReliefPoint){
            this.Id = new PassingTimeId(Guid.NewGuid());
            this.key = _key;
            this.Time = _time;
            this.Node = _node;
            this.IsUsed = _isUsed;
            this.IsReliefPoint = _isReliefPoint;
        }

        public PassingTime(string _id){
            this.Id = new PassingTimeId(_id);
        }
        protected PassingTime(){
            //ORM
        }
    }
}