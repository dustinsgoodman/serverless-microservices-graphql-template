import * as fs from 'fs';
import { parse, ParserOptions } from '@babel/parser';
import generate from '@babel/generator';
import {
  TSTypeAliasDeclaration,
  TSUnionType,
  tSLiteralType,
  stringLiteral,
  ExportNamedDeclaration,
  VariableDeclaration,
  ObjectExpression,
  objectProperty,
  objectExpression,
  numericLiteral,
  ObjectProperty,
  isObjectProperty,
  NumericLiteral,
} from '@babel/types';

export interface ConversionConfig {
  isInitFile: boolean;
}

const DEFAULT_BABEL_OPTIONS: ParserOptions = {
  sourceType: 'unambiguous',
  plugins: ['jsx', 'typescript', 'classProperties'],
};

function getNextPort(portConfig: ObjectExpression): number {
  if (!portConfig) {
    return 3000;
  }

  const usedPorts = portConfig.properties
    .filter((node): node is ObjectProperty => isObjectProperty(node))
    .flatMap((property: ObjectProperty) => {
      return (property.value as ObjectExpression).properties
        .filter((node): node is ObjectProperty => isObjectProperty(node))
        .map((innerProp) => (innerProp.value as NumericLiteral).value);
    });

  return Math.max(...usedPorts) + 2;
}

function getNewPort(port: number) {
  return {
    httpPort: port,
    lambdaPort: port + 2,
  };
}

export const updateServerlessCommon = async (serviceName: string) => {
  try {
    const filePath = './serverless.common.ts';
    const doc = fs.readFileSync(filePath).toString();

    const babelASTFile = parse(doc, DEFAULT_BABEL_OPTIONS);

    // push new service name into service type definition
    const serviceDeclaration = babelASTFile.program
      .body[1] as ExportNamedDeclaration;
    const serviceVariableDeclaration =
      serviceDeclaration.declaration as TSTypeAliasDeclaration;
    const serviceTypeUnion =
      serviceVariableDeclaration.typeAnnotation as TSUnionType;
    serviceTypeUnion.types.push(tSLiteralType(stringLiteral(serviceName)));

    // push new ports into port config
    const portsDeclaration = babelASTFile.program
      .body[4] as ExportNamedDeclaration;
    const portsVaraibleDeclaration =
      portsDeclaration.declaration as VariableDeclaration;
    const portsObject = portsVaraibleDeclaration.declarations[0]
      .init as ObjectExpression;
    const nextPort = getNextPort(portsObject);
    const newPort = getNewPort(nextPort);
    portsObject.properties.push(
      objectProperty(
        stringLiteral(serviceName),
        objectExpression([
          objectProperty(
            stringLiteral('httpPort'),
            numericLiteral(newPort.httpPort)
          ),
          objectProperty(
            stringLiteral('lambdaPort'),
            numericLiteral(newPort.lambdaPort)
          ),
        ])
      )
    );

    // generate output code and write to file
    // @ts-ignore: upstream types issue
    const updatedConfig = generate(babelASTFile).code;
    fs.writeFileSync('./serverless.common.ts', updatedConfig);
  } catch (e) {
    console.log(e);
  }
};
