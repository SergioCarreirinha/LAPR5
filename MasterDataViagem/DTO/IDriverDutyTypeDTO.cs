using System;
using System.Collections.Generic;
using MasterDataViagem.Domain.ParameterValues;

namespace MasterDataViagem.DTO

{
    public class IDriverDutyTypeDTO
    {
        public Guid Id { get; set; }
        
        public string key { get; set; }

        public string name { get; set; }

        public List<ParameterValue> parameters{ get; set; }

    }
}