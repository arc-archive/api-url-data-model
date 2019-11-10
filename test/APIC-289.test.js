import { fixture, assert, html } from '@open-wc/testing';
import { AmfLoader } from './amf-loader.js';
import '@api-components/raml-aware/raml-aware.js';
import '../api-url-data-model.js';

describe('APIC-289', function() {
  async function basicFixture(amf) {
    return (await fixture(html`<api-url-data-model
      .amf="${amf}"
    ></api-url-data-model>`));
  }

  const apiFile = 'APIC-289';

  [
    ['full data model', false],
    ['compact data model', true]
  ].forEach(([label, compact]) => {
    describe(label, () => {
      let element;
      let amf;
      let methodId;

      before(async () => {
        amf = await AmfLoader.load(compact, apiFile);
      });

      beforeEach(async () => {
        const method = AmfLoader.lookupOperation(amf, '/organization', 'get');
        methodId = method['@id'];
        element = await basicFixture(amf);
      });

      it('computes pathModel', () => {
        element.selected = methodId;
        const result = element.queryModel;
        assert.typeOf(result, 'array', 'pathModel is an array');
        assert.lengthOf(result, 1, 'pathModel has no elements');
      });

      it('has OAS property name', () => {
        element.selected = methodId;
        const result = element.queryModel;
        assert.equal(result[0].name, 'foo');
      });
    });
  });
});
