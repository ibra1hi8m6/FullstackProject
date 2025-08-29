using AutoMapper;
using SOBHWMASA.Domain.Entities.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CategorySizeDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Size.CategorySizeDTO;
using SizeDTO = SOBHWMASA.Infrastructure.ViewModel.Products.Size.SizeDTO;
namespace SOBHWMASA.Infrastructure.Mapping
{
    public class SizeMappingProfile : Profile
    {
        public SizeMappingProfile()
        {
            CreateMap<CategorySize, CategorySizeDTO>().ReverseMap();
            CreateMap<Size, SizeDTO>().ReverseMap();
        }
    }
}
