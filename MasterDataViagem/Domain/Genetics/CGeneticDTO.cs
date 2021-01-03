using System.Collections.Generic;
using System;

namespace MasterDataViagem.Domain.Genetics
{
    public class CGeneticDTO
    {

        public Guid Id { get; set; }

        public List<int> population { get; set; }

        public int evaluation { get; set; }

    }
}