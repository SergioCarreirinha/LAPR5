using System;
using System.Collections.Generic;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.DTO
{
    public class IVehicleDutyDTO
    {
        public Guid Id { get; set; }

        public String key { get; set; }

        public String name { get; set; }

        public String color { get; set; }

        public String depots { get; set; }

        public List<WorkBlock> WorkBlocks{ get; set; }

    }
}