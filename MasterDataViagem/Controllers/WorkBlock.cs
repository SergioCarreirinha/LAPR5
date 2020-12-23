using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using MasterDataViagem.Domain.Shared;
using MasterDataViagem.Domain.WorkBlocks;

namespace MasterDataViagem.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class WorkBlockController : ControllerBase
    {
        private readonly WorkBlockService _service;

        public WorkBlockController(WorkBlockService WorkBlockService)
        {
            _service = WorkBlockService;
        }

        // GET: api/WorkBlock
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IWorkBlockDTO>>> GetAll()
        {
            return await _service.Get();
        }

        // GET: api/WorkBlock/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IWorkBlockDTO>> GetGetById(Guid id)
        {
            var cat = await _service.GetById(new WorkBlockId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return cat;
        }

        // POST: api/WorkBlock
        [HttpPost]
        public async Task<ActionResult<IWorkBlockDTO>> Create(IWorkBlockDTO dto)
        {
            var cat = await _service.Create(dto);

            return CreatedAtAction(nameof(GetGetById), new { id = cat.Id }, cat);
        }


        // DELETE: api/WorkBlock/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<IWorkBlockDTO>> HardDelete(Guid id)
        {
            try
            {
                var cat = await _service.DeleteAsync(new WorkBlockId(id));

                if (cat == null)
                {
                    return NotFound();
                }

                return Ok(cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }
    }
}