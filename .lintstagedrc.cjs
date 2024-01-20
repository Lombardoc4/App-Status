// lint-staged.config.js

// *** Source
// https://stackoverflow.com/questions/37927772/how-to-silence-warnings-about-ignored-files-in-eslint
const { ESLint } = require('eslint');

const removeIgnoredFiles = async (files) => {
    const eslint = new ESLint();
    const ignoredFiles = await Promise.all(
        files.map((file) => eslint.isPathIgnored(file)),
    );
    const filteredFiles = files.filter((_, i) => !ignoredFiles[i]);
    return filteredFiles.join(' ');
};

module.exports = {
    '**/*.{js,jsx,ts,tsx}': async (files) => {
        const filesToLint = await removeIgnoredFiles(files);
        return [`eslint --max-warnings=0 ${filesToLint}`, 'prettier -w'];
    },
    '**/*.{json,css,scss,md,webmanifest}': ['prettier -w'],
};
