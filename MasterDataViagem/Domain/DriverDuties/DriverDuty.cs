using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Domain.DriverDuties {
    public class DriverDuty : Entity<DriverDutyId>, IAggregateRoot {

        public string key { get; set; }

        public string name { get; set; }

        public string color { get; set; }

        public string type { get; set; }

        public List<WorkBlock> workBlocks{ get; set; }

        public DriverDuty(string _key, string _name, string _color, string _type, List<WorkBlock> _workBlocks) {
            this.Id = new DriverDutyId(Guid.NewGuid());
            this.key = _key;
            this.name = _name;
            this.color = _color;
            this.type = _type;
            this.workBlocks = _workBlocks;
        }
        
        public DriverDuty(DriverDutyId id,string _key, string _name, string _color, string _type, List<WorkBlock> _workBlocks) {
            this.Id = id;
            this.key = _key;
            this.name = _name;
            this.color = _color;
            this.type = _type;
            this.workBlocks = _workBlocks;
        }

        protected DriverDuty() {
            //ORM
        }
    }
}