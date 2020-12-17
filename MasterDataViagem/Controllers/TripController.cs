using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Trip;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class TripController : ControllerBase {
        private readonly TripService _service;

        public TripController(TripService tripService)
        {
            _service = tripService;
        }

        // GET: api/Trip
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ITripDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/Trip/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ITripDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new TripId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Trip
        [HttpPost]
        public async Task<ActionResult<ITripDTO>> Create(ITripDTO dto)
        {
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // DELETE: api/Trip/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ITripDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new TripId(id));

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