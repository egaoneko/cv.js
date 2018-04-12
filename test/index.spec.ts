import * as chai from 'chai';
import * as mocha from 'mocha';
import { HelloWorld } from '../src/index';

const should: Chai.Should = chai.should();

describe('Hello World', () => {
  const helloWorld: HelloWorld = new HelloWorld();
  it('should print hello world and return 0', () => {
    helloWorld.hello().should.equal('Hello world');
  });
});
