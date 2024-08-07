using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Back.Migrations
{
    public partial class UserRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "alugado",
                table: "Filmes");

            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "Usuarios",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "Usuarios");

            migrationBuilder.AddColumn<bool>(
                name: "alugado",
                table: "Filmes",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
