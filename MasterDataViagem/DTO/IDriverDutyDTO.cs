using System;
using System.Collections.Generic;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.DTO

{
    public class IDriverDutyDTO
    {
        public Guid Id { get; set; }
        
        public string key { get; set; }

        public string name { get; set; }

        public string color { get; set; }

        public string type { get; set; }
        public List<WorkBlock> workBlocks{ get; set; }

    }
}