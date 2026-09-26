using PowerPlatformDriftAnalyzer.Api.Data;
using PowerPlatformDriftAnalyzer.Api.Models;
using PowerPlatformDriftAnalyzer.Api.Services;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddProblemDetails();
builder.Services.AddSingleton<IEnvironmentSnapshotProvider, MockEnvironmentSnapshotProvider>();
builder.Services.AddSingleton<SolutionComparisonService>();

var app = builder.Build();
app.UseExceptionHandler();

app.MapGet("/api/environments", (IEnvironmentSnapshotProvider provider) =>
    Results.Ok(provider.GetSnapshots().Select(snapshot => snapshot.Environment)));

app.MapPost("/api/comparisons/solutions", (
    CompareSolutionsRequest request,
    IEnvironmentSnapshotProvider provider,
    SolutionComparisonService comparisonService) =>
{
    var snapshots = provider.GetSnapshots();
    var configuredIds = snapshots.Select(snapshot => snapshot.Environment.Id).ToHashSet(StringComparer.Ordinal);
    var selectedIds = (request.EnvironmentIds ?? []).ToHashSet(StringComparer.Ordinal);

    if (selectedIds.Count < 2 || selectedIds.Any(id => id is null || !configuredIds.Contains(id)))
    {
        return Results.ValidationProblem(new Dictionary<string, string[]>
        {
            ["environmentIds"] = ["Choose at least two distinct configured environments."],
        });
    }

    var selectedSnapshots = snapshots.Where(snapshot => selectedIds.Contains(snapshot.Environment.Id)).ToArray();
    return Results.Ok(comparisonService.Compare(selectedSnapshots));
});

app.Run();

// Expose the entry point to the in-process HTTP integration tests.
public partial class Program { }
