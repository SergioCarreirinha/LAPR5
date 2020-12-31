using System.Threading.Tasks;

namespace MasterDataViagem.IntegrationTest{
    public class DriverServiceTests : IntegrationTest{
        public async Task Get_WithEmptyClauses(){
            //ARRAGE
            

            //ACT
            var response = TestClient.GetAsync(DriverService.Get);
            //ASSERT
        }
    }
}