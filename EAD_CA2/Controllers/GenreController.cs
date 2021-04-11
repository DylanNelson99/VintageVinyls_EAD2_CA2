using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace EAD_CA2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private readonly Vinylsdb _vinylsDb;


        public GenreController(Vinylsdb vinylsdb)
        {
            _vinylsDb = vinylsdb;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Genre>> Get()
        {
            var Genre = _vinylsDb.Genre;

            return Ok(Genre);
        }
        [Route("FilterGenre")]
        [HttpGet]
        public ActionResult<IEnumerable<Vinyl>> GetItemsbyGenre([FromQuery] string name)
        {

            try
            {
                name = name.ToUpper();

                var Search = _vinylsDb.Vinyl.Include(i => i.Genre).Where(i => i.Genre.GenreName.ToUpper() == name);
                if (Search == null) return NotFound("Vinyl result not found");
                return Ok(Search);

            }
            catch (Exception)
            {
                return StatusCode(500, "Genre couldnot be loaded at this moment");
            }
           
        }




    }
}
