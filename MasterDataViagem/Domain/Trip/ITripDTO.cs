using System;
using MasterDataViagem.Domain.PassingTime;
using System.Collections.Generic;
namespace MasterDataViagem.Domain.Trip
{
    public class ITripDTO
    {
        public Guid Id { get; set; }

        public string key { get; set; }

        public bool IsEmpty { get; set; }

        public string Orientation { get; set; }

        public string Line { get; set; }

        public string Path { get; set; }

        public bool IsGenerated { get; set; }

        public List<PassingTimes> PassingTimes { get; set; }
    }
}