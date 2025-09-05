using AutoMapper;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CouponDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SOBHWMASA.Infrastructure.Mapping.OrderMapping
{
    public class CouponMappingProfile : Profile
    {
        public CouponMappingProfile()
        {
            // CreateMap<Source, Destination>();
            CreateMap<Coupon, CouponReadDto>();
            CreateMap<CouponCreateDto, Coupon>();
        }
    }
}
