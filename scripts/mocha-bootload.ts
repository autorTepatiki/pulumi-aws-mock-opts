
import * as chai from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

chai.use(sinonChai);
global.sinon = sinon;
(global as any).expect = chai.expect;
(global as any).assert = chai.assert;

