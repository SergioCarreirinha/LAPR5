using Microsoft.EntityFrameworkCore.Migrations;

namespace MasterDataViagem.Migrations
{
    public partial class Vehicle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    licensePlate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vin = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    vehicleType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    firstServiceDate = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Vehicles");
        }
    }
}
