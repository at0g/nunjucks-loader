export default function parseDependencies(templateStr) {
    const templateReg = /env\.getTemplate\(\"(.*?)\"/g;

    // Create an object to store references to the dependencies that have been included - this ensures that a template
    // dependency is only written once per file, even if it is used multiple times.
    const dependencies = {};

    let match;
    // Iterate over the template dependencies
    while (match = templateReg.exec(templateStr)) {
        const template = match[1];
        if (!dependencies[template]) {
            dependencies[template] = true;
        }
    }

    return Object.keys(dependencies);
}