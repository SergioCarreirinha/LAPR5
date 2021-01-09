using System.Collections.Generic;
using System;

namespace MasterDataViagem.DTO
{
    public class CGeneticDTO
    {

        public Guid Id { get; set; }

        public List<int> population { get; set; }

        public int evaluation { get; set; }

    }
}