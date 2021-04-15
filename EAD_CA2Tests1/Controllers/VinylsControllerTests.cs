using Microsoft.VisualStudio.TestTools.UnitTesting;
using EAD_CA2.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EAD_CA2.Controllers.Tests
{
    [TestClass()]
    public class VinylsControllerTests
    {
        private readonly Vinylsdb _vinylsDb;

        public VinylsControllerTests(Vinylsdb vinylsDb)
        {
            _vinylsDb = vinylsDb;
        }

        [TestMethod()]
        public void GetTest()
        {
            Vinyl vinyl = new Vinyl();
            

            var request = _vinylsDb.Vinyl.Include(i => i.Genre).AsEnumerable();

            Assert.Equals(vinyl, request);
        }
    }
}