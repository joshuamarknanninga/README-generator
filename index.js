const fs = require('fs');//creates or initializes the README file
const inquirer = require('inquirer');//helps construct the questions for the README file

// // If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (!license) {
    return '';
  }
  return `![License](https://img.shields.io/badge/license-${license}-blue.svg)`;
}

// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (!license) {
    return '';
  }
  return `[License](https://choosealicense.com/licenses/${license.toLowerCase()})`;
}

// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (!license) {
    return '';
  }
  return `## License
This project is licensed under the ${license} license.`;
}

// Function to format input as numbered list
function formatAsNumberedList(input) {
  return input.split(/(?<=\.)\s/).map((line, index) => `${index + 1}. ${line.trim()}`).join('\n\n');
}

// this is the function that generates the markdown for README
function generateMarkdown(data) {
  return `# ${data.title}

${renderLicenseBadge(data.license)}

## Description
${data.description}

## Installation
${formatAsNumberedList(data.installation)}

## Usage
${formatAsNumberedList(data.usage)}

## Contributing
${formatAsNumberedList(data.contributing)}

${renderLicenseSection(data.license)}

## Questions
For questions about the project, you can reach me via:
- Github: [${data.github}](https://github.com/${data.github})
- Email: ${data.email}
`;
}

// Creates an array for questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a brief description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation steps? (Separate steps with line breaks)',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide instructions for using your project: (Separate steps with line breaks)',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide guidelines for contributing to your project: (Separate steps with line breaks)',
  },
  {
    type: 'input',
    name: 'license',
    message: 'What license is your project under?',
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  }
];

// this is the function that creates the README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('README.md file has been generated!');
  });
}

// this is the function to initialize the app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const markdown = generateMarkdown(answers);
    writeToFile('README.md', markdown);
  });
}

// Function call to initialize app
init();
