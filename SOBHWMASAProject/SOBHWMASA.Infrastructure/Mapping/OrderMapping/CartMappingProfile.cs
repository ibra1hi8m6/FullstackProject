using AutoMapper;
using SOBHWMASA.Domain.Entities.Orders;
using SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CartDto = SOBHWMASA.Infrastructure.ViewModel.OrdersDTOS.CartDTOS.CartDto;

namespace SOBHWMASA.Infrastructure.Mapping.OrderMapping
{
    public class CartMappingProfile : Profile
    {
        public CartMappingProfile()
        {
            CreateMap<CartItem, CartItemDto>().ReverseMap();
            CreateMap<Cart, CartDto>().ReverseMap();
        }
    }

}
