using System;
using MasterDataViagem.Domain.Shared;

namespace MasterDataViagem.Domain.ParameterValues {
    public class ParameterValue : Entity<ParameterValueId>, IAggregateRoot {

        public string key { get; set; }

        public string parameter { get; set; }

        public string value { get; set; }

        public ParameterValue(string _key, string _parameter, string _value) {
            this.Id = new ParameterValueId(Guid.NewGuid());
            this.key = _key;
            this.parameter = _parameter;
            this.value = _value;
        }
        public ParameterValue(ParameterValueId id, string _key, string _parameter, string _value) {
            this.Id = id;
            this.key = _key;
            this.parameter = _parameter;
            this.value = _value;
        }

        protected ParameterValue() {
            //ORM
        }
    }
}