// generate-react-query-hooks.ts
import fs from 'fs/promises';
import path from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Project, MethodDeclaration, PropertyDeclaration, ClassDeclaration} from 'ts-morph';

const apiFilePath = path.join(__dirname, '../../src/_requests/Maja/MajaClient.ts'); // Change this path to the actual path of your generated API
const hooksOutputDir = path.join(__dirname, '../../src/api-hooks');

const project = new Project();
const apiSourceFile = project.addSourceFileAtPath(apiFilePath);
const apiClass = apiSourceFile.getClasses()[0];
const apiClassName = apiClass.getName();

apiClass.getProperties().forEach(async (property: PropertyDeclaration) => {
  await fs.rm(hooksOutputDir, {recursive: true, force: true});
  const serviceName = property.getName();
  const serviceType = property.getType();
  const serviceDir = path.join(hooksOutputDir, serviceName);

  // Create a subdirectory for the service
  try {
    await fs.access(serviceDir);
  } catch {
    await fs.mkdir(serviceDir, {recursive: true});
  }

  // Iterate over the methods in the service class
  if (!serviceType) {
    return;
  }

  serviceType.getSymbol()?.getDeclarations().map(async (declaration) => {
    if (declaration instanceof ClassDeclaration) {
      const classDeclaration = declaration as ClassDeclaration;
      classDeclaration.getMethods().map(async (method: MethodDeclaration) => {
        const methodName = method.getName();
        if (methodName === 'request') {
          return;
        }

        // Create a new instance of MajaClient with AxiosHttpRequest
        const apiClientInstance = `const apiClient = new ${apiClassName}();`;

        const returnType = method.getReturnType().getText().split('.')[2]?.replace('>', '');
        const parameters = method.getParameters();

        const importTypes: string[] = []

        const parameterCustomTypes = parameters.map((parameter, i) => {
          let innerType = ""
          let optional = ""
          if (parameter.getType().getText().includes("import")) {
            innerType = parameter.getType().getText().split(".")[1]
            importTypes.push(innerType)
          } else {
            innerType = parameter.getType().getText()
            optional = parameter.isOptional() ? "?" : ""
          }
          return `${parameter.getName()}${optional}: ${innerType}${i === parameters.length - 1 ? '' : ', '}\n`;
        }).join("");

        const parameterCustomNames = (prefix: string) => parameters.map((parameter, i) => {
          return `${prefix}.${parameter.getName()} ${i === parameters.length - 1 ? '' : ', '}`;
        }).join("");
        const CustomTypeString = `
  type ${methodName}Type = { 
    ${parameterCustomTypes}
}`

        if (methodName.toLowerCase().includes('query')) {
          const queryHookName = `use${capitalize(methodName)}`;
          const queryHookFileName = `${queryHookName}.ts`;

          const queryHookFileContent = `
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useQuery, UseQueryOptions } from 'react-query';
import { ${apiClassName}, ${returnType}, ErrorResponse${importTypes.length > 0 ? `, ${importTypes.join(",")}` : ""} }from 'src/_requests/Maja';

${apiClientInstance}

${CustomTypeString}

export function ${queryHookName}(
  queryFnArgs: ${methodName}Type,
  options?: UseQueryOptions<${returnType}, ErrorResponse>,
) {
  const queryKey = [${JSON.stringify(methodName)}, JSON.stringify(queryFnArgs)];

  return useQuery<${returnType}, ErrorResponse>(
    queryKey,
    async (): Promise<${returnType}> => apiClient.${serviceName}.${methodName}(${parameterCustomNames("queryFnArgs")}),
    options
  );
}
`;

          const filePath = path.join(serviceDir, queryHookFileName);
          try {
            await fs.access(filePath);
            console.log(`File ${filePath} already exists.`);
          } catch {
            await fs.writeFile(filePath, queryHookFileContent);
          }
        } else {
          const mutationHookName = `use${capitalize(methodName)}`;
          const mutationHookFileName = `${mutationHookName}.ts`;

          const mutationHookFileContent = `
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { useMutation, UseMutationOptions } from 'react-query';
import { ${apiClassName}, ${returnType}, ErrorResponse${importTypes.length > 0 ? `, ${importTypes.join(",")}` : ""} }from 'src/_requests/Maja';

${apiClientInstance}

${CustomTypeString}

export function ${mutationHookName}(
  options?: UseMutationOptions<${returnType}, ErrorResponse,  ${methodName}Type>
) {
  return useMutation<${returnType}, ErrorResponse,  ${methodName}Type>(
    (data: ${methodName}Type) => apiClient.${serviceName}.${methodName}(${parameterCustomNames("data")}),
    options
  );
}
`;

          const filePath = path.join(serviceDir, mutationHookFileName);
          try {
            await fs.access(filePath);
            console.log(`File ${filePath} already exists.`);
          } catch {
            await fs.writeFile(filePath, mutationHookFileContent);
          }
        }
      });
    }
  });
});

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
