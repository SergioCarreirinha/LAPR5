using System;
using System.Collections.Generic;

namespace MasterDataViagem.DTO

{
    public class CDriverDutyDTO
    {
        public Guid Id { get; set; }
        
        public string key { get; set; }

        public string name { get; set; }

        public string color { get; set; }

        public string type { get; set; }
        public List<String> workBlocks{ get; set; }

    }
}