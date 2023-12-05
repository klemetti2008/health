// eslint-disable-next-line import/no-extraneous-dependencies
import * as dotenv from 'dotenv';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

// Function to parse command-line options
function parseArgs(args: string[]): Record<string, string> {
  const options: Record<string, string> = {};
  args.forEach(arg => {
    const [option, value] = arg.split('=');
    if (option.startsWith('--')) {
      options[option.slice(2)] = value;
    }
  });
  return options;
}

// Parse the command-line options
const options = parseArgs(process.argv);

if (!options.env) {
  console.error('Please specify the .env file with --env.');
  process.exit(1);
}

// Load the .env file
dotenv.config({ path: options.env });

function extractKeysFromType(file: string) {
  const program = ts.createProgram([file], {allowJs: true});

  // eslint-disable-next-line no-restricted-syntax
  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, node => {
        if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
          const typeName = node.name.escapedText.toString();
          const keys: string[] = [];
          const properties = node.type.members;
          properties.forEach(property => {
            if (ts.isPropertySignature(property) && ts.isIdentifier(property.name)) {
              keys.push(property.name.escapedText.toString());
            }else if (ts.isPropertySignature(property) && ts.isStringLiteral(property.name)) {
              keys.push(property.name.text.toString());
            }else if (ts.isPropertySignature(property) && ts.isNumericLiteral(property.name)) {
              keys.push(property.name.text.toString());
            }else if (ts.isPropertySignature(property) && ts.isComputedPropertyName(property.name)) {
              keys.push(property.name.getText(sourceFile));
            }
          });
          writeToDestinationFile(typeName, keys);
        }
      });
    }
  }
}

function writeToDestinationFile(typeName: string, keys: string[]) {
  const folderDestination = process.env.TYPE_KEYS_DESTINATION;
  if (!folderDestination) {
    console.error('FOLDER_DESTINATION environment variable is not set.');
    return;
  }

  if (!fs.existsSync(folderDestination)) {
    console.error(`Folder ${folderDestination} does not exist.`);
    fs.mkdirSync(folderDestination, {recursive: true});
  } else {
    console.log(`Folder ${folderDestination} exists.`);
  }

  const filePath = path.join(folderDestination, `${typeName}Keys.ts`);
  const fileContent = `export const ${typeName}Keys = ${JSON.stringify(keys, null, 2)};\n`;
  fs.writeFileSync(filePath, fileContent);
  console.log(`Keys written to file: ${filePath}`);
}

function fromDir(startPath: string, filter: RegExp, callback: (filename: string) => void) {
  if (!fs.existsSync(startPath)) {
    console.log('No directory:', startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); // recurse
    } else if (filter.test(filename)) callback(filename);
  }
}

fromDir('./', /SortType\.ts$/, (filename) => {
  console.log('-- Found SortType.ts at: ', filename);
  extractKeysFromType(filename);
});

fromDir('./', /FilterType\.ts$/, (filename) => {
  console.log('-- Found FilterType.ts at: ', filename);
  extractKeysFromType(filename);
});
