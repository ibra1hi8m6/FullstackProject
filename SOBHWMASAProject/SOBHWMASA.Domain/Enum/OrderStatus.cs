using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Domain.Enum
{
    public enum OrderStatus
    {
        Pending = 1,
        Cooking = 2,
        OutForDelivery = 3,
        Completed = 4,
        Cancelled = 5
    }
}
