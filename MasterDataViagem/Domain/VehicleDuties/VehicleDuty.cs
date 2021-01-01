using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Domain.VehicleDuties {
    public class VehicleDuty : Entity<VehicleDutyId>, IAggregateRoot {

        public String key { get; set; }

        public String name { get; set; }

        public String color { get; set; }

        public String depots { get; set; }

        public WorkBlock[] WorkBlocks{ get; set; }

        public VehicleDuty(String _key, String _name, String _color, String _depots,WorkBlock[] _workBlocks) {
            this.Id = new VehicleDutyId(Guid.NewGuid());
            this.key = _key;
            this.name = _name;
            this.color = _color;
            this.depots = _depots;
            this.WorkBlocks = _workBlocks;
        }

        protected VehicleDuty() {
            //ORM
        }
    }
}