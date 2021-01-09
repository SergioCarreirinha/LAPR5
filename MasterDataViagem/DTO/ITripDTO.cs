using System;
using MasterDataViagem.Domain.PassingTimes;
using System.Collections.Generic;

namespace MasterDataViagem.DTO
{
    public class ITripDTO
    {
        public Guid Id { get; set; }

        public string key { get; set; }

        public string IsEmpty { get; set; }

        public string Orientation { get; set; }

        public string Line { get; set; }

        public string Path { get; set; }

        public string IsGenerated { get; set; }

        public List<PassingTime> PassingTimes {get; set;}
    }
}