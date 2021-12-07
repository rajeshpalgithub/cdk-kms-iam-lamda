import * as cdk from '@aws-cdk/core';
import * as cognito from '@aws-cdk/aws-cognito';
import * as kms from '@aws-cdk/aws-kms';
import * as lambda from '@aws-cdk/aws-lambda'; 
import * as iam from '@aws-cdk/aws-iam';
// import * as sqs from '@aws-cdk/aws-sqs';

export class CdkCognitoLambdaKmsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // const userPool = new cognito.UserPool(this, 'test-stack-cognito',{
    //   selfSignUpEnabled: true,
    //   accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
    //   userVerification: {
    //     emailStyle: cognito.VerificationEmailStyle.CODE
    //   },
    //   autoVerify: {
    //     email: true
    //   },
    //   standardAttributes: {
    //     email: {
    //       required: true,
    //       mutable: true
    //     }
    //   },
    // })

    // const userPoolClient = new cognito.UserPoolClient(this, "UserPoolClient", {
    //   userPool
    // })

    //lambda
    const kmsLambda = new lambda.Function(this, 'AppSyncProductHandler', {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: 'main.handler',
      code: lambda.Code.fromAsset('lambdaFunctions'),
      memorySize: 1024
    })
    kmsLambda.addEnvironment('SECRATE_ID', '<secrate ID>')
    const secrateReadPolicy = new iam.PolicyStatement({
      actions:['secretsmanager:GetSecretValue'],
      resources:['secrate ARN']
    })
    kmsLambda.role?.attachInlinePolicy(
      new iam.Policy(this, 'read-secrate-policy',{
        statements:[secrateReadPolicy]
      })
    )

  }
}
