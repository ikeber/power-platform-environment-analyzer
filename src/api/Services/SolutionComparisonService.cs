using PowerPlatformDriftAnalyzer.Api.Models;

namespace PowerPlatformDriftAnalyzer.Api.Services;

public sealed class SolutionComparisonService
{
    public IReadOnlyList<SolutionComparison> Compare(IReadOnlyList<EnvironmentSnapshot> snapshots)
    {
        if (snapshots.Count < 2 ||
            snapshots.Select(snapshot => snapshot.Environment.Id).Distinct(StringComparer.Ordinal).Count() != snapshots.Count)
        {
            throw new ArgumentException("Choose at least two distinct environments.", nameof(snapshots));
        }

        var inventories = snapshots.ToDictionary(
            snapshot => snapshot.Environment.Id,
            snapshot => snapshot.Solutions.ToDictionary(solution => solution.UniqueName, StringComparer.Ordinal),
            StringComparer.Ordinal);

        // Align by unique name: a solution's Dataverse ID can differ between environments.
        return snapshots.SelectMany(snapshot => snapshot.Solutions)
            .DistinctBy(solution => solution.UniqueName, StringComparer.Ordinal)
            .Select(solution =>
            {
                var values = inventories.ToDictionary(
                    inventory => inventory.Key,
                    inventory => inventory.Value.GetValueOrDefault(solution.UniqueName),
                    StringComparer.Ordinal);
                var present = values.Values.OfType<Solution>().ToArray();

                return new SolutionComparison(
                    solution.UniqueName,
                    solution.FriendlyName,
                    values,
                    new SolutionDifferences(
                        Missing: present.Length < snapshots.Count,
                        Version: present.Select(value => value.Version).Distinct(StringComparer.Ordinal).Count() > 1,
                        ManagedState: present.Select(value => value.IsManaged).Distinct().Count() > 1));
            })
            .ToArray();
    }
}
