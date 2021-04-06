using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_CA2
{
    public class Genre
    {
        [Key]
        public int GenreID { get; set; }

        [Required]
        public string GenreName { get; set; }
    }
}
