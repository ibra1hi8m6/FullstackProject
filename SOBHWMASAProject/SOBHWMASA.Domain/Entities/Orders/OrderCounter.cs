using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Entities.Orders
{
    public class OrderCounter
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Counter { get; set; }
    }
}
