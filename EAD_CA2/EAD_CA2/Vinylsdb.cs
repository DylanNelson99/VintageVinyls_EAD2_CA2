using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_CA2
{
    public class Vinylsdb : DbContext
    {
        public DbSet<Vinyl> Vinyl { get; set; }

        public DbSet<Genre> Genre { get; set; }

        public Vinylsdb() { }
        public Vinylsdb(DbContextOptions<Vinylsdb> options) : base(options) { }
    }

   
}
