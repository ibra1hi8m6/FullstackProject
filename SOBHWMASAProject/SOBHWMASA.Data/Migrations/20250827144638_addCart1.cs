using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOBHWMASA.Data.Migrations
{
    /// <inheritdoc />
    public partial class addCart1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Status",
                table: "CartCartItems",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "CartCartItems");
        }
    }
}
