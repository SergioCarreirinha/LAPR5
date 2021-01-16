using System;
using MasterDataViagem.Domain.Shared;
using System.Collections.Generic;
using MasterDataViagem.Domain.ParameterValues;

namespace MasterDataViagem.Domain.DriverDutyTypes {
    public class DriverDutyType : Entity<DriverDutyTypeId>, IAggregateRoot {

        public string key { get; set; }

        public string name { get; set; }

        public List<ParameterValue> parameters{ get; set; }

        public DriverDutyType(string _key, string _name, List<ParameterValue> _parameters) {
            this.Id = new DriverDutyTypeId(Guid.NewGuid());
            this.key = _key;
            this.name = _name;
            this.parameters = _parameters;
        }

        protected DriverDutyType() {
            //ORM
        }
    }
}