import { html } from 'lit-html';
import { ApiDemoPage } from '@advanced-rest-client/arc-demo-helper';
import '@api-components/api-server-selector/api-server-selector.js';
import '../api-url-data-model.js';

class ApiDemo extends ApiDemoPage {
  constructor() {
    super();
    this.initObservableProperties([
      'apiBasePrams',
      'endpointUri',
      'apiBaseUri',
      'pathModel',
      'queryModel',
      'selectedShape',
      'serverUri',
      'serverType',
      'allowCustomServers',
      'server',
    ]);
    this.componentName = 'api-url-data-model';
    this._apiBasePramsHandler = this._apiBasePramsHandler.bind(this);
    this._endpointUriHandler = this._endpointUriHandler.bind(this);
    this._apiBaseUriHandler = this._apiBaseUriHandler.bind(this);
    this._pathModelHandler = this._pathModelHandler.bind(this);
    this._queryModelHandler = this._queryModelHandler.bind(this);
    this._serverChangeHandler = this._serverChangeHandler.bind(this);

    this.endpointsOpened = true;
    this.serverUri = undefined;
    this.serverType = undefined;
    this.allowCustomServers = false;
  }

  _navChanged(e) {
    const { selected, type, endpointId } = e.detail;
    if (type === 'method') {
      this.methodId = selected;
      this.endpointId = endpointId;
      this.setData(selected);
    } else {
      this.hasData = false;
    }
  }

  setData(selected) {
    this.selectedShape = selected;
    this.hasData = true;
  }

  _apiListTemplate() {
    return [
      ['demo-api', 'ARC demo api'],
      ['multi-server', 'Multiple servers'],
      ['loan-microservice', 'Loan microservice (OAS)'],
      ['petstore', 'Petstore (OAS)'],
      ['APIC-298', 'OAS param names'],
      ['APIC-289', 'OAS param names (2)'],
      ['SE-12752', 'Query string support'],
    ].map(([file, label]) => html`
    <anypoint-item data-src="${file}-compact.json">${label} - compact model</anypoint-item>
    <anypoint-item data-src="${file}.json">${label}</anypoint-item>
    `);
  }

  _apiBasePramsHandler(e) {
    this.apiParameters = e.target.apiParameters;
  }

  _endpointUriHandler(e) {
    this.endpointUri = e.target.endpointUri;
  }

  _apiBaseUriHandler(e) {
    this.apiBaseUri = e.target.apiBaseUri;
  }

  _pathModelHandler(e) {
    this.pathModel = e.target.pathModel;
  }

  _queryModelHandler(e) {
    this.queryModel = e.target.queryModel;
  }

  _serverChangeHandler(e) {
    const { value, type } = e.detail;
    this.serverType = type;
    this.serverUri = value;
    this.server = this._findServerByValue(value);
  }

  /**
   * @param {String} value Server's base URI
   * @return {Object|undefined} An element associated with the base URI or
   * undefined if not found.
   */
  _findServerByValue(value) {
    const { methodId, endpointId } = this;
    const servers = this._getServers({ endpointId, methodId });
    return servers.find((server) => this._getServerUri(server) === value);
  }

  /**
   * @param {Object} server Server definition.
   * @return {String|undefined} Value for server's base URI
   */
  _getServerUri(server) {
    const key = this._getAmfKey(this.ns.aml.vocabularies.core.urlTemplate);
    return /** @type string */ (this._getValue(server, key));
  }

  contentTemplate() {
    const { server } = this;
    return html`
    ${this._serverSelectorTemplate()}
    <api-url-data-model
      .amf="${this.amf}"
      .server="${server}"
      .selected="${this.selectedShape}"
      @apiparameters-changed="${this._apiBasePramsHandler}"
      @endpointuri-changed="${this._endpointUriHandler}"
      @apibaseuri-changed="${this._apiBaseUriHandler}"
      @pathmodel-changed="${this._pathModelHandler}"
      @querymodel-changed="${this._queryModelHandler}"
      ></api-url-data-model>
    ${this.hasData ?
      html`<section class="content">
        <div class="log">
          <h3>Output</h3>
          <output><label>Current API base URI: </label>${this.apiBaseUri}</output>
          <output><label>Endpoint URI: </label>${this.endpointUri}</output>
          <output>
            <label>API base parameters</label>
            ${this._paramsList(this.apiParameters)}
          </output>
          <output>
            <label>Selected path view model</label>
            ${this._paramsList(this.pathModel)}
          </output>
          <output>
            <label>Selected path query model</label>
            ${this._paramsList(this.queryModel)}
          </output>
        </div>
      </section>` :
      html`<p>Select a HTTP method in the navigation to see the demo.</p>`}
    `;
  }

  _serverSelectorTemplate() {
    const { amf, serverUri, serverType, allowCustomServers } = this;
    return html`
    <api-server-selector
      ?allowCustom="${allowCustomServers}"
      .amf="${amf}"
      .value="${serverUri}"
      .type="${serverType}"
      autoselect
      @apiserverchanged="${this._serverChangeHandler}"
    >
      <slot name="custom-base-uri" slot="custom-base-uri"></slot>
    </api-server-selector>`;
  }

  _paramsList(model) {
    if (!model || !model.length) {
      return html`<i>Nothing to render here, yet.</i>`;
    }
    return model.map((item) => this._paramItem(item));
  }

  _paramItem(model) {
    const { name } = model;
    return html`
    <details>
      <summary>${name}</summary>
      <div class="formatted">${JSON.stringify(model, null, 1)}</div>
    </details>`;
  }
}
const instance = new ApiDemo();
instance.render();
