import * as pulumi from '@pulumi/pulumi';
import {info} from '@pulumi/pulumi/log';
import {assert} from 'chai';
import {stringify} from 'flatted';

pulumi.runtime.setMockOptions({
    testModeEnabled: true,
});

import {opts} from '../src/index';
pulumi.runtime.setMocks(opts);

describe('Infrastructure', function() {
    describe('Dummy', ()=>{
        it('just test mocha boot-load', (done) => {
            assert(true);
            done();
        });
    });

    describe('Basic test', ()=>{
        it('test imports and instantiations', (done) => {
            assert(opts);
            console.log(opts);
            assert(pulumi.runtime.getMonitor());
            info('Pulumi monitor: ' + pulumi.runtime.getMonitor());
            done();
        });
    });

    describe('Extended tests', ()=>{
        const instance = opts;
        it('test imports and instantiations', (done) => {
            assert(instance);
            console.log(instance);
            info('Instance:' + stringify(instance));
            assert(pulumi.runtime.getProject());
            info('Pulumi project: ' + pulumi.runtime.getProject());
            assert(pulumi.runtime.getStack());
            info('Pulumi stack: ' + pulumi.runtime.getStack());
            done();
        });
    });

    describe('Check attributes', ()=>{
        const instance = opts;
        it('check valid functions', (done) => {
            assert(instance);
            const keys = Object.keys(instance);
            assert(keys.length);
            keys.forEach((element) => {
                info(element);
                if (element != 'newResource' && element != 'call') {
                    throw new Error('Unexpected attribute');
                }
            });
            const values = Object.values(instance);
            assert(values.length);
            done();
        });

        it('call implemented function', (done) => {
            const keys = [
                'aws:ssm/getParameter:getParameter',
                'aws:ec2/getRouteTable:getRouteTable',
                'aws:ec2/getVpc:getVpc',
                'aws:index/getRegion:getRegion',
                'aws:index/getAvailabilityZones:getAvailabilityZones',
                'aws:ec2/getSubnetIds:getSubnetIds',
                'aws:eks/getCluster:getCluster',
                'kubernetes:apps/v1:DaemonSet:get',
                'default',
                '',
            ];
            let newResource = null;
            keys.forEach((element) => {
                newResource = instance.call(element, 'token');
                assert(newResource);
                info('Element: ' + element + ' ' + stringify(newResource));
            });
            done();
        });

        it('call implemented function - null arguments', (done) => {
            const newResource = instance.call('null', null);
            assert(newResource);
            info('Element: ' + stringify(newResource));
            done();
        });

        it('newResource implemented function', (done) => {
            const keys = [
                'aws:ec2/subnet:Subnet',
                'aws:ec2/vpc:Vpc',
                'aws:eks/cluster:Cluster',
                'aws:s3/bucket:Bucket',
                'aws:ec2/securityGroup:SecurityGroup',
                'aws:ec2/instance:Instance',
                'kubernetes',
                'default',
                '',
            ];
            let newResource = null;
            keys.forEach((element) => {
                newResource = instance.newResource(element, 'name', {});
                assert(newResource);
                info('Element: ' + element + ' ' + stringify(newResource));
            });
            done();
        });

        it('newResource implemented function - null arguments', (done) => {
            const newResource = instance.newResource('null', 'null', null);
            assert(newResource);
            info('Element: ' + stringify(newResource));
            done();
        });
    });
});
