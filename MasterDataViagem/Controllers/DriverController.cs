using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.Driver;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase {
        private readonly DriverService _service;

        public DriverController(DriverService DriverService)
        {
            _service = DriverService;
        }

        // GET: api/Driver
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IDriverDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/Driver/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IDriverDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new DriverId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/Driver
        [HttpPost]
        public async Task<ActionResult<IDriverDTO>> Create(IDriverDTO dto)
        {
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }

        
        // DELETE: api/Driver/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IDriverDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new DriverId(id));

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