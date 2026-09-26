using PowerPlatformDriftAnalyzer.Api.Models;

namespace PowerPlatformDriftAnalyzer.Api.Data;

public interface IEnvironmentSnapshotProvider
{
    IReadOnlyList<EnvironmentSnapshot> GetSnapshots();
}
