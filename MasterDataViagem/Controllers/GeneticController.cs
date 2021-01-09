using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Genetics;
using Microsoft.AspNetCore.Authorization;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class GeneticController : ControllerBase {
        private readonly GeneticService _service;

        public GeneticController(GeneticService GeneticService)
        {
            _service = GeneticService;
        }

        // GET: api/Driver
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IGeneticDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/Driver/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IGeneticDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new GeneticId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Driver
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CGeneticDTO>> Create(CGeneticDTO dto)
        {
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // DELETE: api/Driver/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IGeneticDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new GeneticId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}