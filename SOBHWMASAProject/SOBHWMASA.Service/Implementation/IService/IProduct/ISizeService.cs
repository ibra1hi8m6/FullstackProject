using System.Collections.Generic;
using System.Threading.Tasks;
using SOBHWMASA.Infrastructure.ViewModel.Products.Size;

namespace SOBHWMASA.Service.Implementation.IService.IProduct
{
    public interface ISizeService
    {
        // CategorySize Methods
        Task AddCategorySizeAsync(CategorySizeDTO categorySizeDTO);
        Task<IEnumerable<CategorySizeDTO>> GetAllCategorySizesAsync();
        Task<CategorySizeDTO> GetCategorySizeByIdAsync(int id);
        Task SoftDeleteCategorySizeAsync(int id);
        Task<CategorySizeDTO> UpdateAndCopyCategorySizeAsync(int id, CategorySizeDTO NewCategorySizeData);

        // Size Methods
        Task AddSizeAsync(SizeDTO sizeDTO);
        Task<IEnumerable<SizeDTO>> GetAllSizesAsync();
        Task<IEnumerable<SizeDTO>> GetSizesByCategoryIdAsync(int categoryId);
        Task<SizeDTO> GetSizeByIdAsync(int id);
        Task SoftDeleteSizeAsync(int id);
        Task<SizeDTO> UpdateAndCopySizeAsync(int id, SizeDTO NewSizeData);
    }
}
