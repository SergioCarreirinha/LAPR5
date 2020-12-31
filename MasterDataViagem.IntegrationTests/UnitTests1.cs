using Xunit;

namespace MasterDataViagem.IntegrationTests
{
    public class IntegrationTest
    {
        protected readonly HttpClient TestClient;
        protected IntegrationTest(){
            var appFactory = new WebApplicationFactory<StartUp>();
            TestClient = appFactory.CreateClient();
        }

        protected async Task AuthenticateAsync(){
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer",GetJwtAsync());
        }

        private async Task<string> GetJwtAsync(){
            
        }

    }
}