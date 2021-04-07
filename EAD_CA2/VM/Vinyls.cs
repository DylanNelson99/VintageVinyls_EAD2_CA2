using EAD_CA2.VM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_CA2
{
    public class Vinyl
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
        public virtual Genre Genre { get; set; }


        public Vinyl()
        {

        }

        public Vinyl(VinylRequest itemToCopy, Genre gen)
        {
            CopyItemRequest(itemToCopy,gen);
        }

        public void CopyItemRequest(VinylRequest itemToCopy, Genre gen)
        {
            VinylID = itemToCopy.VinylID;
            VinylImage = itemToCopy.VinylImage;
            VinylName = itemToCopy.VinylName;
            Artist = itemToCopy.Artist;
            VinylDescription = itemToCopy.VinylDescription;
            ReleaseYear = itemToCopy.ReleaseYear;
            Genre = gen;
        }

    }
}
