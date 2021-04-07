using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_CA2.VM
{
    public class VinylRequest
    {
        [Key]
        public int VinylID { get; set; }

        [Required]
        public string VinylImage { get; set; }

        [Required]
        public string VinylName { get; set; }

        [Required]
        public string Artist { get; set; }

        [Required]
        public string VinylDescription { get; set; }


        [Required]
        public DateTime ReleaseYear { get; set; }

        [Required]
        public  int GenreID { get; set; }
    }
}
