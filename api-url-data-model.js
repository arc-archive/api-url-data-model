import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import '../../@polymer/polymer/lib/elements/dom-if.js';
import '../../@api-components/raml-aware/raml-aware.js';
import '../../@api-components/api-view-model-transformer/api-view-model-transformer.js';
import {AmfHelperMixin, ns} from '../../@api-components/amf-helper-mixin/amf-helper-mixin.js';
/**
 * `api-url-data-model`
 * An element to generate view model for api-url-editor and api-url-params-editor
 * elements from AMF model
 *
 * The component computes all required values from AMF's WebApi model.
 *
 * When using partial query model the `server`, `protocols`, and `version`
 * model must be set manually as partial model won't have this information.
 *
 * After reseting the model to full AMF WebApi model the values are updated.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @appliesMixin AmfHelperMixin
 * @memberof ApiElements
 */
class ApiUrlDataModel extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style>:host {display: none;}</style>
    <template is="dom-if" if="[[aware]]">
      <raml-aware raml="{{amfModel}}" scope="[[aware]]"></raml-aware>
    </template>
    <api-view-model-transformer amf-model="[[amfModel]]" id="transformer"></api-view-model-transformer>`;
  }

  static get properties() {
    return {
      /**
       * Name of the scope to use with `raml-aware`.
       * If this element is used with other aware elements, it updates
       * `webApi` when aware value change.
       */
      aware: String,
      /**
       * Computed value of server definition from the AMF model.
       *
       * The value can be set manually but then the `amfModel` property chnage to
       * an AMF WebApi shape it will be computed from the model.
       */
      server: {type: Object},
      /**
       * List of supported protocols.
       * Required to compute base URI in some cases.
       *
       * The value can be set manually but then the `amfModel` property chnage to
       * an AMF WebApi shape it will be computed from the model.
       */
      protocols: {type: Object},
      /**
       * API version name.
       *
       * The value can be set manually but then the `amfModel` property chnage to
       * an AMF WebApi shape it will be computed from the model.
       */
      version: {type: String},
      /**
       * The `@id` property of selected endpoint and method to compute
       * data models for.
       */
      selected: String,
      /**
       * Computed model of selected endpoint
       */
      endpoint: {
        type: Object,
        computed: '_computeModelEndpointModel(amfModel, selected)'
      },
      /**
       * Computed model of HTTP method.
       */
      method: {
        type: Object,
        computed: '_computeMethodAmfModel(amfModel, selected)'
      },
      /**
       * Computed view model for API uri parameters.
       */
      apiParameters: {
        type: Array,
        notify: true,
        computed: '_computeApiParameters(server, version)'
      },
      /**
       * A property to set to override AMF's model base URI information.
       * When this property is set, the `endpointUri` property is recalculated.
       */
      baseUri: String,
      /**
       * Computed value of API base URI.
       */
      apiBaseUri: {
        type: String,
        notify: true,
        computed: '_computeApiBaseUri(server, version, protocols, baseUri)'
      },
      /**
       * Generated view model for query parameters.
       */
      queryModel: {
        type: Array,
        computed: '_computeQueryModel(method)',
        notify: true
      },
      /**
       * Generated view model for path parameters
       *
       * @type {Object}
       */
      pathModel: {
        type: Array,
        computed: '_computePathModel(endpoint, method, apiParameters)',
        notify: true
      },
      /**
       * Computed value of full endpoint URI when selection has been made.
       */
      endpointUri: {
        type: String,
        notify: true,
        computed: '_computeEndpointUri(server, endpoint, baseUri, version)'
      },
      /**
       * Selected endponit relative path.
       */
      endpointPath: {
        type: String,
        notify: true,
        computed: '_computeEndpointPath(endpoint)'
      }
    };
  }

  static get observers() {
    return [
      '_amfModelChnaged(amfModel)'
    ];
  }
  /**
   * Computes values for `server`, `version`, and `protocol` properties if the
   * model is a web api model.
   * @param {Object} model The AMF model.
   */
  _amfModelChnaged(model) {
    if (model instanceof Array) {
      model = model[0];
    }
    if (!model || !this._hasType(model, ns.raml.vocabularies.document + 'Document')) {
      return;
    }
    this.server = this._computeServer(model);
    this.protocols = this._computeProtocols(model);
    this.version = this._computeApiVersion(model);
  }
  /**
   * Computes `apiBaseUri` property when `amfModel` change.
   *
   * @param {Object} server Server definition model
   * @param {?String} version API version number
   * @param {?Array<String>} protocols List of supported protocols.
   * @param {?String} baseUri A uri to override APIs base uri
   * @return {String}
   */
  _computeApiBaseUri(server, version, protocols, baseUri) {
    let uri = this._getBaseUri(baseUri, server, protocols);
    if (!uri) {
      return;
    }
    if (version && uri.indexOf('{version}') !== -1) {
      uri = uri.replace('{version}', version);
    }
    const lastIndex = uri.length - 1;
    if (uri[lastIndex] === '/') {
      uri = uri.substr(0, lastIndex);
    }
    return uri;
  }
  /**
   * Computes uri paramerters lsit for API base.
   * If `version` is set it eliminates it from the variables if it's set.
   *
   * @param {Object} server The `http://raml.org/vocabularies/http#server`
   * object
   * @param {?String} version API version number
   * @return {Array<Object>} A view model.
   */
  _computeApiParameters(server, version) {
    if (!server) {
      return [];
    }
    const variables = this._computeServerVariables(server);
    if (!variables || !variables.length) {
      return [];
    }
    if (version) {
      for (let i = variables.length - 1; i >=0; i--) {
        const name = this._getValue(variables[i], this.ns.schema.schemaName);
        if (name === 'version') {
          variables.splice(i, 1);
          break;
        }
      }
    }
    this.$.transformer.amfModel = this.amfModel;
    let model = this.$.transformer.computeViewModel(variables);
    if (model && model.length) {
      model = Array.from(model);
    } else {
      model = undefined;
    }
    return model;
  }
  /**
   * Computes combined list of path parameters from server definition
   * (RAML's base URI) and current path variables.
   * @param {Object} endpoint Endpoint model
   * @param {Object} method Method model
   * @param {?Array<Object>} apiParameters Current value of API parameters
   * @return {Array<Object>}
   */
  _computePathModel(endpoint, method, apiParameters) {
    if (!endpoint) {
      return;
    }
    let params = this._computeQueryParameters(endpoint);
    if (!params || !params.length) {
      params = this._uriParamsFromMethod(method);
      if (!params) {
        return apiParameters;
      }
    }
    this.$.transformer.amfModel = this.amfModel;
    let model = this.$.transformer.computeViewModel(params);
    if (!model) {
      model = [];
    }
    if (apiParameters && apiParameters[0]) {
      model = Array.from(apiParameters).concat(model);
    }
    return model;
  }
  /**
   * Finds URI parameters in method definition.
   * @param {Object} method Method model
   * @return {Array<Object>|undefined}
   */
  _uriParamsFromMethod(method) {
    if (!method) {
      return;
    }
    const request = this._computeExpects(method);
    if (!request) {
      return;
    }
    const key = this._getAmfKey(this.ns.raml.vocabularies.http + 'uriParameter');
    const params = this._ensureArray(request[key]);
    return params && params.length ? params : undefined;
  }
  /**
   * Computes value for `queryModel` property.
   *
   * @param {Object} method Supported operation model
   * @return {Array<Object>}
   */
  _computeQueryModel(method) {
    if (!method) {
      return [];
    }
    const request = this._computeExpects(method);
    if (!request) {
      return [];
    }
    const params = this._computeQueryParameters(request);
    if (!params) {
      return [];
    }
    this.$.transformer.amfModel = this.amfModel;
    let data = this.$.transformer.computeViewModel(params);
    if (data && data.length) {
      data = Array.from(data);
    } else {
      data = [];
    }
    return data;
  }
  /**
   * Computes endpoint's path value
   * @param {Object} endpoint Endpoint model
   * @return {String}
   */
  _computeEndpointPath(endpoint) {
    return this._getValue(endpoint, this.ns.raml.vocabularies.http + 'path');
  }
  /**
   * Computes value of endpoint model.
   *
   * The selection (id) can be for endpoint or for a method.
   * This tries endpoint first and then method.
   *
   * @param {Object} api WebApi or EndPoint AMF shape.
   * @param {String} id Endpoint/method selection
   * @return {Object|undefined} Endpoint model.
   */
  _computeModelEndpointModel(api, id) {
    if (!api) {
      return;
    }
    if (api instanceof Array) {
      api = api[0];
    }
    if (this._hasType(api, ns.raml.vocabularies.http + 'EndPoint')) {
      return api;
    }
    const webApi = this._computeWebApi(api);
    if (!webApi || !id) {
      return;
    }
    let model = this._computeEndpointModel(webApi, id);
    if (model) {
      return model;
    }
    model = this._computeMethodModel(webApi, id);
    if (!model) {
      return;
    }
    return this._computeMethodEndpoint(webApi, model['@id']);
  }

  _computeMethodAmfModel(model, selected) {
    if (!model || !selected) {
      return;
    }
    if (model instanceof Array) {
      model = model[0];
    }
    if (this._hasType(model, ns.raml.vocabularies.document + 'Document')) {
      const webApi = this._computeWebApi(model);
      return this._computeMethodModel(webApi, selected);
    }
    const key = this._getAmfKey(ns.w3.hydra.supportedOperation);
    const methods = this._ensureArray(model[key]);
    if (!methods) {
      return;
    }
    for (let i = 0; i < methods.length; i++) {
      if (methods[i]['@id'] === selected) {
        return methods[i];
      }
    }
  }
}
window.customElements.define('api-url-data-model', ApiUrlDataModel);
