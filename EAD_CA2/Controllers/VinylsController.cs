using EAD_CA2.VM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace EAD_CA2.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class VinylsController : ControllerBase
    {
        private readonly Vinylsdb _vinylsDb;

        public VinylsController(Vinylsdb vinylsDb)
        {
            _vinylsDb = vinylsDb;       
        }
        [Route("GetVinyls")]
        [HttpGet]
        public ActionResult<IEnumerable<Vinyl>> Get()
        {
            var allVinyls = _vinylsDb.Vinyl.Include(i => i.Genre).AsEnumerable();


            return Ok(allVinyls);
        }

        [Route("AddVinyls")]
        [HttpPost]
        public ActionResult<string> Add(VinylRequest newVinyl)
        {
            var newVin = _vinylsDb.Genre.FirstOrDefault(v => v.GenreID == newVinyl.GenreID);
            Vinyl vinyl = new(newVinyl, newVin);

            if (newVin == null)
            {
                return StatusCode(500, "Failed to add; Genre doesn't match");
            }
            else
            {

                try
                {
                    _vinylsDb.Vinyl.Add(vinyl);
                    _vinylsDb.SaveChanges();
                    return Ok("Added successfully");
                }
                catch (Exception )
                {
                    return StatusCode(500, "Failed to add");

                }

            }

          
        }
        [Route("UpdateVinyl")]
        [HttpPut]
        public ActionResult<string> Update(VinylRequest updatedVinyl)
        {
            try
            {
                var itemFromDb = _vinylsDb.Vinyl.FirstOrDefault(item => item.VinylID == updatedVinyl.VinylID);
                if (itemFromDb == null) return NotFound("Vinyl not found");

                Genre gen;

                if (updatedVinyl.GenreID == 0)
                    gen = itemFromDb.Genre;
                else
                    gen = _vinylsDb.Genre.FirstOrDefault(g => g.GenreID == updatedVinyl.GenreID);
                if (gen == null) return NotFound("Vinyl genre not found");

                itemFromDb.CopyItemRequest(updatedVinyl, gen);
                _vinylsDb.SaveChanges();

                return Ok("Vinyl updated");
            }
            catch (Exception)
            {
                return StatusCode(500, "Failed to update");
            }
        }

        [Route("{id}")]
        [HttpDelete]
        public ActionResult<string> DeleteVinyls([FromRoute] int id)
        {
            try
            {
                var deleteItem = _vinylsDb.Vinyl.FirstOrDefault(i => i.VinylID == id);
                if (deleteItem == null) return NotFound("Vinyl not found");

                _vinylsDb.Remove(deleteItem);
                _vinylsDb.SaveChanges();    

                return Ok("Vinyl deleted");
            }
            catch (Exception)
            {
                return StatusCode(500, "Failed to delete");
            }
        }

        [Route("SearchVinyl")]
        [HttpGet]
        public ActionResult<IEnumerable<Vinyl>> SearchVinyl(string name)
        {

            try
            {
                name = name.ToUpper();

                var Search = _vinylsDb.Vinyl.Include(i => i.Genre).Where(i => i.Artist.ToUpper() == name || i.VinylName.ToUpper() == name);
                if (Search == null) return NotFound("Vinyl result not found");
                    return Ok(Search);
            }
            catch (Exception)
            {
                return StatusCode(500, "Server Error");
            }
           
        }
      


    }
}
