import * as pulumi from '@pulumi/pulumi';

pulumi.runtime.setMockOptions({
    testModeEnabled: true,
    dryRun: true,
    legacyApply: true,
});

export const opts: pulumi.runtime.Mocks = {
    // new_resource mocks resource construction calls
    newResource: function(type, name, inputs) {
        // pre-requisite and defaults
        if (inputs == null) {
            inputs = {
                name: '1234567890',
            };
        }

        switch (type) {
        case 'aws:ec2/subnet:Subnet':
            return {
                name: inputs.name || name + '-subnet',
                id: 'subnet-1234567890',
                state: {
                    ...inputs,
                    arn: 'arn:aws:ec2:us-east-1:123456789012:subnet/1234567890',
                    availabilityZone: 'us-east-1a',
                    cidrBlock: '192.168.1.0/24',
                    vpcId: 'vpc-1234567890',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        case 'aws:ec2/vpc:Vpc':
            return {
                id: 'vpc-1234567890',
                state: {
                    ...inputs,
                    name: inputs.name || name + '-vpc',
                    arn: 'arn:aws:ec2:us-east-1:123456789012:vpc/1234567890',
                    cidrBlock: '192.168.0.0/16',
                    defaultSecurityGroupId: 'sg-1234567890',
                    enableDnsHostnames: false,
                    mainRouteTableId: 'rt-1234567890',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        case 'aws:eks/cluster:Cluster':
            return {
                id: '1234567890',
                state: {
                    ...inputs,
                    name: inputs.name || name + '-eks',
                    arn: 'arn:aws:eks:us-east-1:123456789012:cluster/1234567890',
                    createdAt: '2020-11-01T00:00:00',
                    platformVersion: 'eks.12',
                    endpoint: 'https://AAAA0000BBBB1111CCCC2222DDDD3333.gr0.us-east-1.eks.amazonaws.com',
                    roleArn: 'arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000',
                    status: 'ACTIVE', // `CREATING`, `ACTIVE`, `DELETING`, `FAILED`.
                    vpcConfig: {
                        subnetIds: [
                            'subnet-1234567890',
                            'subnet-1234567890',
                        ],
                        securityGroupIds: ['sg-1234567890'],
                    },
                    version: '1.14',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        case 'kubernetes':
            return {
                name: 'provider',
                id: inputs.name + '-id',
                state: {
                    cluster: 'cloudops-eks-import-dev',
                    kubeconfig: '{"kind":"Config","apiVersion":"v1","preferences":{},"clusters":[{"name":"cloudops-eks-import-dev","cluster":{"server":"https://AAAA0000BBBB1111CCCC2222DDDD3333.gr7.us-east-1.eks.amazonaws.com","certificate-authority-data":"LLKL=Qalaszz1231kaadadcad12213d"}}],"users":[{"name":"arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000","user":{"exec":{"command":"aws","args":["--region","us-east-1","eks","get-token","--cluster-name","cloudops-eks-import-dev"],"env":[{"name":"AWS_PROFILE","value":"profile-name"}],"apiVersion":"client.authentication.k8s.io/v1alpha1"}}}],"contexts":[{"name":"arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000","context":{"cluster":"arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000","user":"arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201113124404311700000002"}}],"current-context":"arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000"}',
                },
            };

        case 'aws:s3/bucket:Bucket':
            return {
                id: '1234567890',
                state: {
                    ...inputs,
                    arn: 'arn:aws:s3:us-east-1:123456789012:bucket/1234567890',
                    name: inputs.name || name + '-bucket',
                    accelerationStatus: 'none',
                    acl: 'acl-',
                    bucket: 'bucket',
                    bucketDomainName: 'mock-domain.aws.com',
                    bucketPrefix: 'mock-prefix',
                    corsRules: 'none',
                    hostedZoneId: 'us-east-1a',
                    region: 'us-east-1',
                    policy: 'mock-policy',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        case 'aws:ec2/securityGroup:SecurityGroup':
            return {
                id: 'sg-1234567890',
                state: {
                    ...inputs,
                    arn: 'arn:aws:ec2:us-east-1:123456789012:security-group/1234567890',
                    name: inputs.name || name + '-sg',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        case 'aws:ec2/instance:Instance':
            return {
                id: 'i-1234567890abcdef0',
                state: {
                    ...inputs,
                    arn: 'arn:aws:ec2:us-east-2:123456789012:instance/i-1234567890abcdef0',
                    instanceState: 'running',
                    primaryNetworkInterfaceId: 'eni-1234567890',
                    privateDns: 'ip-10-0-0-1.ec2.internal',
                    publicDns: 'ec2-200-0-0-1.compute-1.amazonaws.com',
                    publicIp: '200.0.0.1',
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };

        default:
            console.log('-- mock default type to constant id and state:', type);
            return {
                id: (inputs.name) ?
                    inputs.name + '_id' :
                    '1234567890',
                state: {
                    ...inputs,
                    tags: [
                        {
                            key: 'value',
                        },
                    ],
                },
            };
        }
    },
    // call mocks provider-implemented functions (aws.get_availability_zones)
    call: function(token, args, provider) {
        console.log('runtime call mock: ', token);
        switch (token) {
        /* eslint-disable no-case-declarations */
        case 'aws:ec2/getSubnetIds:getSubnetIds':
            const mockSubnet = {
                id: 'subnet-1234567890',
                ids: ['subnet-1234567890'],
                vpcId: 'vpc-1234567890',
            };
            console.log('-- mock getSubnetIds: ', mockSubnet);
            return mockSubnet;

        case 'aws:index/getAvailabilityZones:getAvailabilityZones':
            const mockAZ = {
                id: '1234567890',
                state: 'available',
                allAvailabilityZones: false,
                groupNames: ['us-east-1a'],
                names: ['us-east-1a'],
                zoneIds: ['us-east-1a'],
            };
            console.log('-- mock getAvailabilityZones: ', mockAZ);
            return mockAZ;

        case 'aws:index/getRegion:getRegion':
            const mockRegion = {
                name: 'us-east-1',
                description: 'mock-region',
                endpoint: 'https://mock.aws.amazonaws.com',
                id: '1234567890',
            };
            console.log('-- mock region', mockRegion);
            return mockRegion;

        case 'aws:ec2/getVpc:getVpc':
            console.log('-- mock vpc is default');
            return {
                default: true,
            };

        case 'aws:ec2/getRouteTable:getRouteTable':
            const mockRT = {
                id: 'rt-1234567890',
                ownerId: 'mock',
                routeTableId: 'rt-1234567890',
                routes: [],
                subnetId: 'subnet-1234567890',
                vpcId: 'vpc-1234567890',
                filters: [],
            };
            console.log('-- mock route table', mockRT);
            return mockRT;

        case 'aws:ssm/getParameter:getParameter':
            const mockParam = {
                arn: 'arn:aws:ssm/getParameter:getParameter/1234567890',
                id: '1234567890',
                name: 'mock',
                type: 'string',
                value: '',
                version: 1,
                withDecryption: false,
            };
            console.log('-- mock parameter', mockParam);
            return mockParam;

        /* eslint-disable no-case-declarations */
        case 'aws:eks/getCluster:getCluster':
            const mockCluster = {
                arn: 'arn-role-12345',
                certificateAuthority: {
                    /* base64-encoded kubernetes-admin certificate */
                    data: 'LLKL=Qalaszz1231kaadadcad12213d',
                },
                createdAt: 'cloudteam-nonprod',
                enabledClusterLogTypes: ['', ''],
                endpoint: 'https://AAAA0000BBBB1111CCCC2222DDDD3333.gr0.us-east-1.eks.amazonaws.com',
                id: 'cloudops-eks-import-dev',
                identities: [
                    {
                        'oidcs': [
                            {
                                'issuer': 'https://oidc.eks.us-east-1.amazonaws.com/id/AAAA0000BBBB1111CCCC2222DDDD3333',
                            },
                        ],
                    },
                ],
                name: 'cloudops-eks-import-dev',
                platformVersion: 'eks.12',
                roleArn: 'arn:aws:iam::123456789012:role/cloudops-eks-import-dev20201101235959000000000000',
                status: 'ACTIVE',
                tags: {},
                version: '1.14',
                vpcConfig: {
                    clusterSecurityGroupId: 'sg-1234567890',
                    endpointPrivateAccess: false,
                    endpointPublicAccess: true,
                    publicAccessCidrs: [
                        '0.0.0.0/0',
                    ],
                    securityGroupIds: [
                        'sg-1234567890',
                    ],
                    subnetIds: [
                        'subnet-1234567890',
                        'subnet-1234567891',
                    ],
                    vpcId: 'vpc-1234567890',
                },
            };
            console.log('-- mock getCluster: ', mockCluster);
            return mockCluster;

        case 'kubernetes:apps/v1:DaemonSet:get':
            const mockDaemonset = {
                apiVersion: 'v1',
                kind: 'DaemonSet',
                metadata: {},
                spec: {
                    selector: {},
                    template: {},
                },
            };
            return mockDaemonset;

        default:
            console.log('-- mock default param to constant id: ', args);
            return (args == null) ? {
                id: '1234567890',
                state: {
                    name: 'mock',
                },
            } :
                args;
        }
    },
};
