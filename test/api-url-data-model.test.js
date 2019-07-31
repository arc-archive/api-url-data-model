import { fixture, assert, nextFrame } from '@open-wc/testing';
import sinon from 'sinon/pkg/sinon-esm.js';
import { AmfLoader } from './amf-loader.js';
import '@api-components/raml-aware/raml-aware.js';
import '../api-url-data-model.js';

describe('<api-url-data-model>', function() {
  async function basicFixture() {
    return (await fixture(`<api-url-data-model></api-url-data-model>`));
  }
  async function baseUriFixture() {
    return (await fixture(`<api-url-data-model apiuri="https://test.domain.com/api/"></api-url-data-model>`));
  }
  async function otherFixture() {
    return (await fixture(`<api-url-data-model></api-url-data-model>`));
  }
  async function awareFixture() {
    return (await fixture(`<div>
      <api-url-data-model aware="test-api"></api-url-data-model>
      <raml-aware scope="test-api"></raml-aware>
      </div>`
    ));
  }

  describe('amf setter / getter', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets _amf value', () => {
      const value = {};
      element.amf = value;
      assert.isTrue(element._amf === value);
    });

    it('getter has value', () => {
      const value = {};
      element.amf = value;
      assert.isTrue(element.amf === value);
    });

    it('calls requestUpdate()', () => {
      const value = {};
      element.amf = [];
      const spy = sinon.spy(element, 'requestUpdate');
      element.amf = value;
      assert.equal(spy.args[0][0], 'amf', 'First argument is set');
      assert.deepEqual(spy.args[0][1], [], 'old value is passed');
    });

    it('calls _computeModelEndpointModel()', () => {
      const value = {};
      const spy = sinon.spy(element, '_computeModelEndpointModel');
      element.amf = value;
      assert.isTrue(spy.called);
    });

    it('calls _computeMethodAmf()', () => {
      const value = {};
      const spy = sinon.spy(element, '_computeMethodAmf');
      element.amf = value;
      assert.isTrue(spy.called);
    });

    it('calls _amfChanged()', () => {
      const value = {};
      const spy = sinon.spy(element, '_amfChanged');
      element.amf = value;
      assert.isTrue(spy.called);
    });

    it('ignores the same value', () => {
      const value = {};
      element.amf = value;
      const spy = sinon.spy(element, 'requestUpdate');
      element.amf = value;
      assert.isFalse(spy.called);
    });
  });

  describe('server setter / getter', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('sets _server value', () => {
      const value = {};
      element.server = value;
      assert.isTrue(element._server === value);
    });

    it('getter has value', () => {
      const value = {};
      element.server = value;
      assert.isTrue(element.server === value);
    });

    it('calls _computeApiParameters()', () => {
      const value = {};
      element._version = 'test-version';
      const spy = sinon.spy(element, '_computeApiParameters');
      element.server = value;
      assert.deepEqual(spy.args[0][0], value, 'value is passed');
      assert.equal(spy.args[0][1], 'test-version', 'version argument is set');
    });

    it('calls _computeApiBaseUri()', () => {
      const value = {};
      element._version = 'test-version';
      element._protocols = ['test-protocol'];
      element._apiUri = 'test-uri';
      const spy = sinon.spy(element, '_computeApiBaseUri');
      element.server = value;
      assert.deepEqual(spy.args[0][0], value, 'value is passed');
      assert.equal(spy.args[0][1], 'test-version', 'version argument is set');
      assert.deepEqual(spy.args[0][2], ['test-protocol'], 'protocol argument is set');
      assert.equal(spy.args[0][3], 'test-uri', 'apiUri argument is set');
    });

    it('calls _computeEndpointUri()', () => {
      const value = {};
      element._version = 'test-version';
      element._apiUri = 'test-uri';
      element._endpoint = {};
      const spy = sinon.spy(element, '_computeEndpointUri');
      element.server = value;
      assert.deepEqual(spy.args[0][0], value, 'value is passed');
      assert.deepEqual(spy.args[0][1], {}, 'endpoint argument is set');
      assert.equal(spy.args[0][2], 'test-uri', 'apiUri argument is set');
      assert.equal(spy.args[0][3], 'test-version', 'version argument is set');
    });

    it('ignores the same value', () => {
      const value = {};
      element.server = value;
      const spy = sinon.spy(element, '_computeApiParameters');
      element.server = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_protocols setter / getter', () => {
    const value = ['https', 'custom'];
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_protocols getter has value', () => {
      element._protocols = value;
      assert.isTrue(element._protocols === value);
    });

    it('protocols getter has value', () => {
      element._protocols = value;
      assert.isTrue(element.protocols === value);
    });

    it('calls _computeApiBaseUri()', () => {
      element._version = 'test-version';
      element._apiUri = 'test-uri';
      element._server = {};
      const spy = sinon.spy(element, '_computeApiBaseUri');
      element._protocols = value;
      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.equal(spy.args[0][1], 'test-version', 'version argument is set');
      assert.deepEqual(spy.args[0][2], value, 'protocol argument is set');
      assert.equal(spy.args[0][3], 'test-uri', 'apiUri argument is set');
    });

    it('ignores the same value', () => {
      element._protocols = value;
      const spy = sinon.spy(element, '_computeApiBaseUri');
      element._protocols = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_version setter / getter', () => {
    const value = 'v1.0.0-test';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_version getter has value', () => {
      element._version = value;
      assert.isTrue(element._version === value);
    });

    it('version getter has value', () => {
      element._version = value;
      assert.isTrue(element.version === value);
    });

    it('calls _computeApiBaseUri()', () => {
      element._apiUri = 'test-uri';
      element._server = {};
      element._protocols = ['test-protocol'];

      const spy = sinon.spy(element, '_computeApiBaseUri');
      element._version = value;

      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.equal(spy.args[0][1], value, 'version argument is set');
      assert.deepEqual(spy.args[0][2], ['test-protocol'], 'protocol argument is set');
      assert.equal(spy.args[0][3], 'test-uri', 'apiUri argument is set');
    });

    it('calls _computeApiParameters()', () => {
      element._server = {};

      const spy = sinon.spy(element, '_computeApiParameters');
      element._version = value;

      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.equal(spy.args[0][1], value, 'version argument is set');
    });

    it('calls _computeEndpointUri()', () => {
      element._server = {};
      element._apiUri = 'test-uri';
      element._endpoint = {};

      const spy = sinon.spy(element, '_computeEndpointUri');
      element._version = value;

      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.deepEqual(spy.args[0][1], {}, 'endpoint argument is set');
      assert.equal(spy.args[0][2], 'test-uri', 'apiUri argument is set');
      assert.equal(spy.args[0][3], value, 'version argument is set');
    });

    it('ignores the same value', () => {
      element._version = value;
      const spy = sinon.spy(element, '_computeApiBaseUri');
      element._version = value;
      assert.isFalse(spy.called);
    });
  });

  describe('selected setter / getter', () => {
    const value = 'x-test';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_selected getter has value', () => {
      element.selected = value;
      assert.isTrue(element._selected === value);
    });

    it('selected getter has value', () => {
      element.selected = value;
      assert.isTrue(element.selected === value);
    });

    it('calls _computeModelEndpointModel()', () => {
      const spy = sinon.spy(element, '_computeModelEndpointModel');
      element.selected = value;

      assert.isTrue(spy.called);
    });

    it('calls _computeMethodAmf()', () => {
      const spy = sinon.spy(element, '_computeMethodAmf');
      element.selected = value;

      assert.isTrue(spy.called);
    });

    it('ignores the same value', () => {
      element.selected = value;
      const spy = sinon.spy(element, '_computeMethodAmf');
      element.selected = value;
      assert.isFalse(spy.called);
    });
  });

  describe('apiUri setter / getter', () => {
    const value = 'https://x-domain';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_apiUri getter has value', () => {
      element.apiUri = value;
      assert.isTrue(element._apiUri === value);
    });

    it('apiUri getter has value', () => {
      element.apiUri = value;
      assert.isTrue(element.apiUri === value);
    });

    it('calls _computeApiBaseUri()', () => {
      element._version = 'test-version';
      element._server = {};
      element._protocols = ['x'];

      const spy = sinon.spy(element, '_computeApiBaseUri');
      element.apiUri = value;

      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.equal(spy.args[0][1], 'test-version', 'version argument is set');
      assert.deepEqual(spy.args[0][2], ['x'], 'protocol argument is set');
      assert.equal(spy.args[0][3], value, 'apiUri argument is set');
    });

    it('calls _computeEndpointUri()', () => {
      element._server = {};
      element._endpoint = {};
      element._version = 'v1';

      const spy = sinon.spy(element, '_computeEndpointUri');
      element.apiUri = value;

      assert.deepEqual(spy.args[0][0], {}, 'server argument is set');
      assert.deepEqual(spy.args[0][1], {}, 'endpoint argument is set');
      assert.equal(spy.args[0][2], value, 'apiUri argument is set');
      assert.equal(spy.args[0][3], 'v1', 'version argument is set');
    });

    it('ignores the same value', () => {
      element._protocols = value;
      const spy = sinon.spy(element, '_computeApiBaseUri');
      element._protocols = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_apiParameters setter / getter', () => {
    const value = [];
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_apiParameters getter has value', () => {
      element._apiParameters = value;
      assert.isTrue(element._apiParameters === value);
    });

    it('apiParameters getter has value', () => {
      element._apiParameters = value;
      assert.isTrue(element.apiParameters === value);
    });

    it('calls _computePathModel()', () => {
      element._endpoint = { endpoint: true };
      element._method = { method: true };

      const spy = sinon.spy(element, '_computePathModel');
      element._apiParameters = value;

      assert.deepEqual(spy.args[0][0], { endpoint: true }, 'endpoint argument is set');
      assert.deepEqual(spy.args[0][1], { method: true }, 'method argument is set');
      assert.deepEqual(spy.args[0][2], value, 'apiParameters argument is set');
    });

    it('dispatches apiparameters-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('apiparameters-changed', spy);
      element._apiParameters = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._apiParameters = value;
      const spy = sinon.spy(element, '_computePathModel');
      element._apiParameters = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_apiBaseUri setter / getter', () => {
    const value = 'https://base.domain.com';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_apiBaseUri getter has value', () => {
      element._apiBaseUri = value;
      assert.isTrue(element._apiBaseUri === value);
    });

    it('apiBaseUri getter has value', () => {
      element._apiBaseUri = value;
      assert.isTrue(element.apiBaseUri === value);
    });

    it('dispatches apibaseuri-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('apibaseuri-changed', spy);
      element._apiBaseUri = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._apiBaseUri = value;
      const spy = sinon.spy();
      element.addEventListener('apibaseuri-changed', spy);
      element._apiBaseUri = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_queryModel setter / getter', () => {
    const value = [{}];
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_queryModel getter has value', () => {
      element._queryModel = value;
      assert.isTrue(element._queryModel === value);
    });

    it('queryModel getter has value', () => {
      element._queryModel = value;
      assert.isTrue(element.queryModel === value);
    });

    it('dispatches querymodel-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('querymodel-changed', spy);
      element._queryModel = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._queryModel = value;
      const spy = sinon.spy();
      element.addEventListener('querymodel-changed', spy);
      element._queryModel = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_pathModel setter / getter', () => {
    const value = [{}];
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_pathModel getter has value', () => {
      element._pathModel = value;
      assert.isTrue(element._pathModel === value);
    });

    it('pathModel getter has value', () => {
      element._pathModel = value;
      assert.isTrue(element.pathModel === value);
    });

    it('dispatches pathmodel-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('pathmodel-changed', spy);
      element._pathModel = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._pathModel = value;
      const spy = sinon.spy();
      element.addEventListener('pathmodel-changed', spy);
      element._pathModel = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_endpointUri setter / getter', () => {
    const value = 'endpoint-url';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_endpointUri getter has value', () => {
      element._endpointUri = value;
      assert.isTrue(element._endpointUri === value);
    });

    it('endpointUri getter has value', () => {
      element._endpointUri = value;
      assert.isTrue(element.endpointUri === value);
    });

    it('dispatches endpointuri-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('endpointuri-changed', spy);
      element._endpointUri = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._endpointUri = value;
      const spy = sinon.spy();
      element.addEventListener('endpointuri-changed', spy);
      element._endpointUri = value;
      assert.isFalse(spy.called);
    });
  });

  describe('_endpointPath setter / getter', () => {
    const value = 'endpoint-path';
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('_endpointPath getter has value', () => {
      element._endpointPath = value;
      assert.isTrue(element._endpointPath === value);
    });

    it('endpointPath getter has value', () => {
      element._endpointPath = value;
      assert.isTrue(element.endpointPath === value);
    });

    it('dispatches endpointpath-changed event', () => {
      const spy = sinon.spy();
      element.addEventListener('endpointpath-changed', spy);
      element._endpointPath = value;

      assert.deepEqual(spy.args[0][0].detail.value, value);
    });

    it('ignores the same value', () => {
      element._endpointPath = value;
      const spy = sinon.spy();
      element.addEventListener('endpointpath-changed', spy);
      element._endpointPath = value;
      assert.isFalse(spy.called);
    });
  });

  [
    ['Full data model', false],
    ['Compact data model', true]
  ].forEach((setupItem) => {
    describe(setupItem[0], () => {
      const API_HOST = 'http://api.{instance}.domain.com:8254/v1';

      describe('Base computations', () => {
        let element;
        let amf;
        let endpointId;
        let methodId;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1]);
        });

        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/test-parameters/{feature}');
          endpointId = endpoint['@id'];
          const method = element._computeOperations(webApi, endpointId)[0];
          methodId = method['@id'];
        });

        it('Computes apiBaseUri', () => {
          assert.equal(element.apiBaseUri, API_HOST);
        });

        it('Computes api uri parameters', () => {
          const result = element.apiParameters;
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 1);
        });

        it('server is computed', () => {
          const key = element._getAmfKey(element.ns.raml.vocabularies.http + 'Server');
          assert.typeOf(element.server, 'object');
          assert.equal(element.server['@type'][0], key);
        });

        it('protocols is computed', () => {
          assert.typeOf(element.protocols, 'array');
          assert.deepEqual(element.protocols, ['HTTP', 'HTTPS']);
        });

        it('version is computed', () => {
          assert.equal(element.version, 'v1');
        });

        it('queryModel is undefined', () => {
          assert.isUndefined(element.queryModel);
        });

        it('pathModel is undefined', () => {
          assert.isUndefined(element.pathModel);
        });

        it('endpointUri is computed', () => {
          assert.equal(element.endpointUri, API_HOST);
        });

        it('endpointPath is undefined', () => {
          assert.isUndefined(element.endpointPath);
        });

        it('endpoint is undefined', () => {
          assert.isUndefined(element.endpoint);
        });

        it('method is undefined', () => {
          assert.isUndefined(element.method);
        });

        it('Computes query parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.queryModel, 'array');
          assert.lengthOf(element.queryModel, 3);
          element.queryModel.forEach((item) => {
            assert.equal(item.binding, 'query');
          });
          assert.equal(element.queryModel[0].name, 'testRepeatable');
          assert.equal(element.queryModel[1].name, 'numericRepeatable');
          assert.equal(element.queryModel[2].name, 'notRequiredRepeatable');
        });

        it('Computes path parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.pathModel, 'array');
          assert.lengthOf(element.pathModel, 2);
          element.pathModel.forEach((item) => {
            assert.equal(item.binding, 'path');
          });
          assert.equal(element.pathModel[0].name, 'instance');
          assert.equal(element.pathModel[1].name, 'feature');
        });

        it('Computes API server parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.apiParameters, 'array');
          assert.lengthOf(element.apiParameters, 1);
          element.apiParameters.forEach((item) => {
            assert.equal(item.binding, 'path');
          });
          assert.equal(element.apiParameters[0].name, 'instance');
        });
      });

      describe('apiUri setter', () => {
        let element;
        let amf;
        let endpointId;
        let methodId;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1]);
        });

        beforeEach(async () => {
          element = await baseUriFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/test-parameters/{feature}');
          endpointId = endpoint['@id'];
          const method = element._computeOperations(webApi, endpointId)[0];
          methodId = method['@id'];
          element.selected = methodId;
        });

        it('computes apiBaseUri', () => {
          assert.equal(element.apiBaseUri, 'https://test.domain.com/api');
        });

        it('computes endpointUri', () => {
          assert.equal(element.endpointUri, 'https://test.domain.com/api/test-parameters/{feature}');
        });

        it('changes apiBaseUri when apiUri property change', () => {
          element.apiUri = 'https://other.domain.com/endpoint';
          assert.equal(element.apiBaseUri, 'https://other.domain.com/endpoint');
        });

        it('changes endpointUri when apiUri property change', () => {
          element.apiUri = 'https://other.domain.com/endpoint';
          assert.equal(element.endpointUri, 'https://other.domain.com/endpoint/test-parameters/{feature}');
        });
      });

      describe('Endpoint only computations', () => {
        let element;
        let amf;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1]);
        });

        let endpointId;
        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/test-parameters/{feature}');
          endpointId = endpoint['@id'];
        });

        it('Computes endpointUri for an endpoint', () => {
          element.selected = endpointId;
          assert.equal(element.endpointUri, API_HOST + '/test-parameters/{feature}');
        });

        it('Computes endpointPath for an endpoint', () => {
          element.selected = endpointId;
          assert.equal(element.endpointPath, '/test-parameters/{feature}');
        });

        it('Computes pathModel', () => {
          element.selected = endpointId;
          const result = element.pathModel;
          assert.typeOf(result, 'array', 'pathModel is an array');
        });

        it('pathModel contains base api uri parameters', () => {
          element.selected = endpointId;
          const result = element.pathModel;
          assert.deepEqual(result[0], element.apiParameters[0]);
        });

        it('pathModel contains endpoint uri parameters', () => {
          element.selected = endpointId;
          const result = element.pathModel;
          assert.equal(result[1].name, 'feature');
        });

        it('method is undefined', () => {
          element.selected = endpointId;
          assert.isUndefined(element.method);
        });

        it('queryModel is undefined', () => {
          element.selected = endpointId;
          assert.isUndefined(element.queryModel);
        });
      });

      describe('Method computations', () => {
        let element;
        let amf;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1]);
        });

        let endpointId;
        let methodId;
        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/test-parameters/{feature}');
          endpointId = endpoint['@id'];
          const method = element._computeOperations(webApi, endpointId)[0];
          methodId = method['@id'];
        });

        it('Computes endpointUri for an endpoint', () => {
          element.selected = methodId;
          assert.equal(element.endpointUri, API_HOST + '/test-parameters/{feature}');
        });

        it('Computes endpointPath for an endpoint', () => {
          element.selected = methodId;
          assert.equal(element.endpointPath, '/test-parameters/{feature}');
        });

        it('Computes pathModel', () => {
          element.selected = methodId;
          const result = element.pathModel;
          assert.typeOf(result, 'array', 'result is an array');
          assert.lengthOf(result, 2, 'result has 2 items');
          assert.equal(result[1].name, 'feature');
        });

        it('Computes queryModel', () => {
          element.selected = methodId;
          const result = element.queryModel;
          assert.typeOf(result, 'array', 'result is an array');
          assert.lengthOf(result, 3, 'result has 3 items');
        });

        it('method is computed', () => {
          const key = element._getAmfKey(element.ns.w3.hydra.core + 'Operation');
          element.selected = methodId;
          assert.typeOf(element.method, 'object');
          assert.equal(element.method['@type'][0], key);
        });

        it('pathModel is set when promise resolves', () => {
          element.selected = methodId;
          assert.typeOf(element.pathModel, 'array');
          assert.lengthOf(element.pathModel, 2);
        });
      });

      describe('_computeQueryModel()', function() {
        let method;
        let element;
        let amf;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1]);
        });

        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/test-parameters/{feature}');
          const endpointId = endpoint['@id'];
          method = element._computeOperations(webApi, endpointId)[0];
        });

        it('Returns empty array when no model', () => {
          const result = element._computeQueryModel();
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 0);
        });

        it('Returns empty array when invalid model', () => {
          const result = element._computeQueryModel({});
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 0);
        });

        it('Returns query parameters model', () => {
          const result = element._computeQueryModel(method);
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 3);
        });

        it('Computes model when setting up the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.amf = amf;
          const result = element._computeQueryModel(method);
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 3);
        });
      });
    });
  });

  [
    ['full data model', false, 'petstore'],
    ['compact data model', true, 'petstore']
  ].forEach((setupItem) => {
    describe('OAS ' + setupItem[0], () => {
      describe('Base computations', () => {
        let element;
        let amf;
        let endpointId;
        let methodId;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1], setupItem[2]);
        });

        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          const webApi = element._computeWebApi(amf);
          const endpoint = element._computeEndpointByPath(webApi, '/pets/{id}');
          endpointId = endpoint['@id'];
          const method = element._computeOperations(webApi, endpointId)[0];
          methodId = method['@id'];
        });

        it('Computes apiBaseUri', () => {
          assert.equal(element.apiBaseUri,
            'https://qax.anypoint.mulesoft.com/mocking/api/v1/links/784699fb-6f73-474f-8c7a-96d2384539e7/api');
        });

        it('Computes api uri parameters', () => {
          const result = element.apiParameters;
          assert.typeOf(result, 'array');
          assert.lengthOf(result, 0);
        });

        it('server is computed', () => {
          const key = element._getAmfKey(element.ns.raml.vocabularies.http + 'Server');
          assert.typeOf(element.server, 'object');
          assert.equal(element.server['@type'][0], key);
        });

        it('protocols is computed', () => {
          assert.typeOf(element.protocols, 'array');
          assert.deepEqual(element.protocols, ['http']);
        });

        it('version is computed', () => {
          assert.equal(element.version, '4.1.0');
        });

        it('queryModel is undefined', () => {
          assert.isUndefined(element.queryModel);
        });

        it('pathModel is undefined', () => {
          assert.isUndefined(element.pathModel);
        });

        it('endpointUri is computed', () => {
          assert.equal(element.endpointUri,
            'https://qax.anypoint.mulesoft.com/mocking/api/v1/links/784699fb-6f73-474f-8c7a-96d2384539e7/api');
        });

        it('endpointPath is undefined', () => {
          assert.isUndefined(element.endpointPath);
        });

        it('endpoint is undefined', () => {
          assert.isUndefined(element.endpoint);
        });

        it('method is undefined', () => {
          assert.isUndefined(element.method);
        });

        it('Computes query parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.queryModel, 'array');
          assert.lengthOf(element.queryModel, 2);
          element.queryModel.forEach((item) => {
            assert.equal(item.binding, 'query');
          });
          assert.equal(element.queryModel[0].name, 'tags');
          assert.equal(element.queryModel[1].name, 'limit');
        });

        it('Computes path parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.pathModel, 'array');
          assert.lengthOf(element.pathModel, 1);
          element.pathModel.forEach((item) => {
            assert.equal(item.binding, 'path');
          });
          assert.equal(element.pathModel[0].name, 'id');
        });

        it('Computes API server parameters when initializing the element', async () => {
          const element = await otherFixture();
          await nextFrame();
          element.selected = methodId;
          element.amf = amf;
          assert.typeOf(element.apiParameters, 'array');
          assert.lengthOf(element.apiParameters, 0);
          element.apiParameters.forEach((item) => {
            assert.equal(item.binding, 'path');
          });
        });
      });

      describe('URI parameters computation', () => {
        let element;
        let amf;

        before(async () => {
          amf = await AmfLoader.load(setupItem[1], setupItem[2]);
        });

        let webApi;
        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          webApi = element._computeWebApi(amf);
        });

        it('pathModel is empty for an endpoint', () => {
          const endpoint = element._computeEndpointByPath(webApi, '/pets/{id}');
          element.selected = endpoint['@id'];
          const result = element.pathModel;
          assert.typeOf(result, 'array', 'pathModel is an array');
          assert.lengthOf(result, 0, 'pathModel has no elements');
        });

        it('pathModel is set for a method', () => {
          const endpoint = element._computeEndpointByPath(webApi, '/pets/{id}');
          const method = element._computeOperations(webApi, endpoint['@id'])[0];
          element.selected = method['@id'];
          const result = element.pathModel;
          assert.typeOf(result, 'array', 'pathModel is an array');
          assert.lengthOf(result, 1, 'pathModel has 1 element');
        });

        it('pathModel is empty when no parameters', () => {
          const endpoint = element._computeEndpointByPath(webApi, '/pets');
          const method = element._computeOperations(webApi, endpoint['@id'])[0];
          element.selected = method['@id'];
          const result = element.pathModel;
          assert.typeOf(result, 'array', 'pathModel is an array');
          assert.lengthOf(result, 0, 'pathModel has no elements');
        });
      });

      describe('_uriParamsFromMethod()', () => {
        let element;
        let amf;
        before(async () => {
          amf = await AmfLoader.load(setupItem[1], setupItem[2]);
        });

        let webApi;
        beforeEach(async () => {
          element = await basicFixture();
          element.amf = amf;
          webApi = element._computeWebApi(amf);
        });

        it('Returns undefined when no argument', () => {
          const result = element._uriParamsFromMethod();
          assert.isUndefined(result);
        });

        it('Returns undefined when no request model', () => {
          const result = element._uriParamsFromMethod({});
          assert.isUndefined(result);
        });

        it('Returns undefined when method has no parameters', () => {
          const endpoint = element._computeEndpointByPath(webApi, '/pets');
          const method = element._computeOperations(webApi, endpoint['@id'])[0];
          const result = element._uriParamsFromMethod(method);
          assert.isUndefined(result);
        });

        it('Computes parameters for a method', () => {
          const endpoint = element._computeEndpointByPath(webApi, '/pets/{id}');
          const method = element._computeOperations(webApi, endpoint['@id'])[0];
          const result = element._uriParamsFromMethod(method);
          assert.typeOf(result, 'array');
        });
      });
    });
  });

  describe('Partial model', () => {
    let element;
    let amf;

    before(async () => {
      amf = await AmfLoader.load(false, 'partial-model/endpoint');
    });

    beforeEach(async () => {
      element = await basicFixture();
      element.amf = amf;
      element.selected = '#69';
    });

    it('server is undefined', () => {
      assert.isUndefined(element.server);
    });

    it('server can be set', async () => {
      const summary = await AmfLoader.load(false, 'partial-model/summary');
      element.server = element._computeServer(summary);
      assert.typeOf(element.queryModel, 'array');
      assert.lengthOf(element.queryModel, 7);
    });

    it('apiBaseUri is computed from server property', async () => {
      const summary = await AmfLoader.load(false, 'partial-model/summary');
      element.server = element._computeServer(summary);
      assert.equal(element.apiBaseUri, 'http://petstore.swagger.io/v2');
    });

    it('endpointUri is computed from server property', async () => {
      const summary = await AmfLoader.load(false, 'partial-model/summary');
      element.server = element._computeServer(summary);
      assert.equal(element.endpointUri, 'http://petstore.swagger.io/v2/api/user');
    });
  });

  describe('raml-aware', () => {
    let element;
    let aware;
    beforeEach(async () => {
      const region = await awareFixture();
      element = region.querySelector('api-url-data-model');
      aware = region.querySelector('raml-aware');
    });

    it('renders raml-aware', () => {
      const node = element.shadowRoot.querySelector('raml-aware');
      assert.ok(node);
    });

    it('sets model from aware', async () => {
      const amf = await AmfLoader.load();
      aware.api = amf;
      assert.typeOf(element.amf, 'array', 'element has amf set');
      assert.isTrue(element.amf === amf, 'amf value is the model');
    });
  });

  describe('onapiparameters', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onapiparameters);
      const f = () => {};
      element.onapiparameters = f;
      assert.isTrue(element.onapiparameters === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onapiparameters = f;
      element._apiParameters = [];
      element.onapiparameters = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onapiparameters = f1;
      element.onapiparameters = f2;
      element._apiParameters = [];
      element.onapiparameters = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onapibaseuri', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onapibaseuri);
      const f = () => {};
      element.onapibaseuri = f;
      assert.isTrue(element.onapibaseuri === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onapibaseuri = f;
      element._apiBaseUri = 'http://';
      element.onapibaseuri = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onapibaseuri = f1;
      element.onapibaseuri = f2;
      element._apiBaseUri = 'http://';
      element.onapibaseuri = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onquerymodel', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onquerymodel);
      const f = () => {};
      element.onquerymodel = f;
      assert.isTrue(element.onquerymodel === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onquerymodel = f;
      element._queryModel = [{}];
      element.onquerymodel = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onquerymodel = f1;
      element.onquerymodel = f2;
      element._queryModel = [{}];
      element.onquerymodel = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onpathmodel', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onpathmodel);
      const f = () => {};
      element.onpathmodel = f;
      assert.isTrue(element.onpathmodel === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onpathmodel = f;
      element._pathModel = [{}];
      element.onpathmodel = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onpathmodel = f1;
      element.onpathmodel = f2;
      element._pathModel = [{}];
      element.onpathmodel = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onendpointuri', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onendpointuri);
      const f = () => {};
      element.onendpointuri = f;
      assert.isTrue(element.onendpointuri === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onendpointuri = f;
      element._endpointUri = 'https://';
      element.onendpointuri = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onendpointuri = f1;
      element.onendpointuri = f2;
      element._endpointUri = 'https://';
      element.onendpointuri = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('onendpointpath', () => {
    let element;
    beforeEach(async () => {
      element = await basicFixture();
    });

    it('Getter returns previously registered handler', () => {
      assert.isUndefined(element.onendpointpath);
      const f = () => {};
      element.onendpointpath = f;
      assert.isTrue(element.onendpointpath === f);
    });

    it('Calls registered function', () => {
      let called = false;
      const f = () => {
        called = true;
      };
      element.onendpointpath = f;
      element._endpointPath = 'https://';
      element.onendpointpath = null;
      assert.isTrue(called);
    });

    it('Unregisteres old function', () => {
      let called1 = false;
      let called2 = false;
      const f1 = () => {
        called1 = true;
      };
      const f2 = () => {
        called2 = true;
      };
      element.onendpointpath = f1;
      element.onendpointpath = f2;
      element._endpointPath = 'https://';
      element.onendpointpath = null;
      assert.isFalse(called1);
      assert.isTrue(called2);
    });
  });

  describe('a11y', () => {
    it('adds aria-hidden attribute', async () => {
      const element = await basicFixture();
      assert.equal(element.getAttribute('aria-hidden'), 'true');
    });

    it('respects existing aria-hidden attribute', async () => {
      const element = await fixture(`<api-url-data-model aria-hidden="true"></api-url-data-model>`);
      assert.equal(element.getAttribute('aria-hidden'), 'true');
    });

    it('is accessible', async () => {
      const element = await basicFixture();
      await assert.isAccessible(element);
    });
  });
});
