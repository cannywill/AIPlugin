import generateRepoMap from "../../util/generateRepoMap";
export const viewRepoMapImpl = async (args, extras) => {
    const repoMap = await generateRepoMap(extras.llm, extras.ide, {
        outputRelativeUriPaths: true,
        includeSignatures: true,
    });
    return [
        {
            name: "Repo map",
            description: "Overview of the repository structure",
            content: repoMap,
        },
    ];
};
