namespace PowerPlatformDriftAnalyzer.Api.Models;

public sealed record AnalyzerEnvironment(string Id, string DisplayName, string Url);

public sealed record Solution(
    Guid SolutionId,
    string UniqueName,
    string FriendlyName,
    string Version,
    bool IsManaged);

public sealed record EnvironmentSnapshot(
    AnalyzerEnvironment Environment,
    IReadOnlyList<Solution> Solutions);

public sealed record SolutionDifferences(bool Missing, bool Version, bool ManagedState);

public sealed record SolutionComparison(
    string UniqueName,
    string FriendlyName,
    IReadOnlyDictionary<string, Solution?> Environments,
    SolutionDifferences Differences);

public sealed record CompareSolutionsRequest(string?[]? EnvironmentIds);
