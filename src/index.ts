import * as pulumi from '@pulumi/pulumi';

pulumi.runtime.setMockOptions({
    testModeEnabled: true,
    dryRun: true,
    legacyApply: true,
});

export * from './mockOpts';

