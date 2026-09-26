using PowerPlatformDriftAnalyzer.Api.Models;

namespace PowerPlatformDriftAnalyzer.Api.Data;

// These inventories are sample data only. No environment URLs are queried.
public sealed class MockEnvironmentSnapshotProvider : IEnvironmentSnapshotProvider
{
    private static readonly IReadOnlyList<EnvironmentSnapshot> Snapshots =
    [
        new(new("dev", "DEV", "https://driftvale-dev.crm.dynamics.com"),
        [
            CreateSolution(1, 1, "driftvale_core", "Driftvale Core", "2.4.0.0", false),
            CreateSolution(1, 2, "driftvale_sales", "Driftvale Sales", "3.2.0.0", false),
            CreateSolution(1, 3, "driftvale_service", "Driftvale Service", "1.5.0.0", false),
            CreateSolution(1, 4, "driftvale_portal", "Driftvale Portal", "1.8.0.0", false),
            CreateSolution(1, 6, "driftvale_reporting", "Driftvale Reporting", "2.1.0.0", false),
            CreateSolution(1, 7, "driftvale_shared", "Driftvale Shared Components", "1.2.3.0", true),
        ]),
        new(new("test", "TEST", "https://driftvale-test.crm.dynamics.com"),
        [
            CreateSolution(2, 1, "driftvale_core", "Driftvale Core", "2.4.0.0", false),
            CreateSolution(2, 2, "driftvale_sales", "Driftvale Sales", "3.1.0.0", false),
            CreateSolution(2, 3, "driftvale_service", "Driftvale Service", "1.5.0.0", true),
            CreateSolution(2, 5, "driftvale_integration", "Driftvale Integration", "4.0.0.0", true),
            CreateSolution(2, 6, "driftvale_reporting", "Driftvale Reporting", "2.0.0.0", true),
            CreateSolution(2, 7, "driftvale_shared", "Driftvale Shared Components", "1.2.3.0", true),
        ]),
        new(new("uat", "UAT", "https://driftvale-uat.crm.dynamics.com"),
        [
            CreateSolution(3, 1, "driftvale_core", "Driftvale Core", "2.4.0.0", true),
            CreateSolution(3, 2, "driftvale_sales", "Driftvale Sales", "3.1.0.0", true),
            CreateSolution(3, 3, "driftvale_service", "Driftvale Service", "1.5.0.0", true),
            CreateSolution(3, 5, "driftvale_integration", "Driftvale Integration", "4.0.0.0", true),
            CreateSolution(3, 6, "driftvale_reporting", "Driftvale Reporting", "2.0.0.0", true),
            CreateSolution(3, 7, "driftvale_shared", "Driftvale Shared Components", "1.2.3.0", true),
        ]),
        new(new("prod", "PROD", "https://driftvale-prod.crm.dynamics.com"),
        [
            CreateSolution(4, 1, "driftvale_core", "Driftvale Core", "2.4.0.0", true),
            CreateSolution(4, 2, "driftvale_sales", "Driftvale Sales", "3.1.0.0", true),
            CreateSolution(4, 3, "driftvale_service", "Driftvale Service", "1.5.0.0", true),
            CreateSolution(4, 5, "driftvale_integration", "Driftvale Integration", "4.0.0.0", true),
            CreateSolution(4, 6, "driftvale_reporting", "Driftvale Reporting", "1.9.0.0", true),
            CreateSolution(4, 7, "driftvale_shared", "Driftvale Shared Components", "1.2.3.0", true),
        ]),
    ];

    public IReadOnlyList<EnvironmentSnapshot> GetSnapshots() => Snapshots;

    private static Solution CreateSolution(
        int environmentNumber, int solutionNumber, string uniqueName,
        string friendlyName, string version, bool isManaged)
    {
        // Keep the original fixtures' distinct, stable IDs in each environment.
        var part = new string((char)('0' + solutionNumber), 4);
        var id = Guid.Parse($"{environmentNumber}1111111-{part}-{part}-{part}-{part}{part}{part}");
        return new Solution(id, uniqueName, friendlyName, version, isManaged);
    }
}
