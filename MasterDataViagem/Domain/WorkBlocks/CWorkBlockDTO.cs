using System;
using System.Collections.Generic;

namespace MasterDataViagem.Domain.WorkBlocks
{
    public class CWorkBlockDTO
    {
        public Guid Id { get; set; }

        public string key { get; set; }

        public int startTime { get; set; }

        public int endTime { get; set; }

        public string startNode { get; set; }

        public string endNode { get; set; }

        public Boolean isCrewTravelTime { get; set; }

        public Boolean isActive { get; set; }

        public List<String> trips { get; set; }

    }
}