using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.Trip;

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
        public List<Tripes> trips { get; set; }

        public WorkBlock(string _key, int _startTime, int _endTime, string _startNode, string _endNode, Boolean _isCrewTravelTime, Boolean _isActive, List<Tripes> _trips)
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

        public WorkBlock(string _id)
        {
            this.Id = new WorkBlockId(_id);
        }

        

        protected WorkBlock()
        {
            //ORM
        }
    }
}