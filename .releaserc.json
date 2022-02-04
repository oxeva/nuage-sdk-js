{
    "branches": ["main"],
    "plugins": [
        "@semantic-release/commit-analyzer",
        [
            "@semantic-release/release-notes-generator",
            {
                "linkCompare": false,
                "linkReferences": false
            }
        ],
        "@semantic-release/changelog",
        "@semantic-release/gitlab",
        "@semantic-release/npm",
        [
            "@semantic-release/git",
            {
                "assets": ["package.json", "CHANGELOG.md"],
                "message":
                    "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
            }
        ]
    ]
}
