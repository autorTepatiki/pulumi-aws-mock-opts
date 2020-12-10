# UNIT-TEST RUNTIME MOCK OPTIONS for `pulumi`

- Esta libreria refiere a las opciones de mockeo para PULUMI para todo objeto posible.

- (*) PULUMI es un framework de desarrollo de IAC, infraestructura como código. Dentro de éste, particularmente hace uso de la libreria de mas abstraccion `aws-cloud`.

![AWS-logo](images/aws.png?raw=true) 


## Pre-requisitos

- Instalar AWS CLI (https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html), especificamente para la version 1 (https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)


- Instalar paquetes dependientes via NPM, tras clonar este repositorio, ejemplo:
```
cd pulumi-aws-mock-opts
npm i
```


## Opcionales

- Instalar PULUMI (https://www.pulumi.com/docs/get-started/install/) si prefiere, o via NPM como dependencia, `@dev-thought/pulumi-npm`.
```
Downloading zipped Pulumi executable from https://get.pulumi.com/releases/sdk/pulumi-v2.11.2-linux-x64.tar.gz...
```


## Incluya su lógica eventualmente

- En los archivos siguientes, implemente su componente adicional :
+ test/index.test.ts, maquetacion de pruebas unitarias del componente, que deberá evolucionar
+ test/mockOpts.ts, maquetacion de pruebas unitarias del componente, que deberá evolucionar


![template](images/code-template.png?raw=true)


## Uso de la librería/componente desde otros proyectos

- Pueden verse los test unitarios para las formas de invocar ésta.

``` typescript
import {opts} from './mockOpts';
pulumi.runtime.setMocks(opts);
```

###  Ejemplificativo para S3 

``` typescript
import * as pulumi from '@pulumi/pulumi';
pulumi.runtime.setMockOptions({
    testModeEnabled: true,
});

import {opts} from 'pulumi-aws-mock-opts';
pulumi.runtime.setMocks(opts);

import {S3Component} from 'pulumi-aws-s3';


describe('EXAMPLE FOR README', function() {
    const x: S3Component = new S3Component('example', {});

    // check that instance has been instantiated.
    it('should be instantiated', (done) => {
        assert(x);
        done();
    });
    
    // check that instance has poperties.
    it('must exist when created from component', function(done) {
        pulumi.all([x.arn, x.id, x.region, x.tags])
            .apply(([arn, id, region, tags]) => {
                console.log('arn :' + arn);
                console.log('id :' + id);
                console.log('region :' + region);
                console.log('tags :' + tags);
                pulumi.all([instance.bucket])
                    .apply((bucket) => {
                        console.log('bucket object: ', bucket);
                        done();
                    });
            });
    });
});
```


