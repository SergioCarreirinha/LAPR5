using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.DriverDuties;
using Microsoft.AspNetCore.Authorization;
using MasterDataViagem.Service;
using MasterDataViagem.DTO;

namespace MasterDataViagem.Controllers {
    
    [Route("api/[controller]")]
    [ApiController]
    public class DriverDutyController : ControllerBase {
        private readonly DriverDutyService _service;

        public DriverDutyController(DriverDutyService driverDutyService)
        {
            _service = driverDutyService;
        }

        // GET: api/vehicleDuty
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<IDriverDutyDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/DriverDuty/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<IDriverDutyDTO>> GetById(Guid id)
        {
            var cat = await _service.GetById(new DriverDutyId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/DriverDuty
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IDriverDutyDTO>> Create(CDriverDutyDTO dto)
        {
            string error = "erro";
            var cat = await _service.Create(dto);

            if (cat != null) {
                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            }else{
                return BadRequest(new {error});
            }
        }

        
        // DELETE: api/DriverDuty/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<IDriverDutyDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new DriverDutyId(id));

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