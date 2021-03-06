using System;
using System.Collections.Generic;
using MasterDataViagem.Domain.Genetics;

namespace MasterDataViagem.DTO
{
    public class IGeneticDTO
    {
        public Guid Id { get; set; }

        public List<Population> population { get; set; }

        public int evaluation { get; set; }

    }
}