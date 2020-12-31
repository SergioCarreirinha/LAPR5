using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.PassingTime;

namespace MasterDataViagem.Domain.WorkBlocks
{
    public class WorkBlock : Entity<WorkBlockId>, IAggregateRoot
    {

        public string key { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }
        public string startNode { get; set; }
        public string endNode { get; set; }
        public Boolean isCrewTravelTime { get; set; }
        public Boolean isActive { get; set; }
        public string[] trips { get; set; }

        public WorkBlock(string _key, int _startTime, int _endTime, string _startNode, string _endNode, Boolean _isCrewTravelTime, Boolean _isActive, string[] _trips)
        {
            this.Id = new WorkBlockId(Guid.NewGuid());
            this.key = _key;
            this.startTime = _startTime;
            this.endTime = _endTime;
            this.startNode = _startNode;
            this.endNode = _endNode;
            this.isCrewTravelTime = _isCrewTravelTime;
            this.isActive = _isActive;
            this.trips = _trips;
        }

        protected WorkBlock()
        {
            //ORM
        }
    }
}