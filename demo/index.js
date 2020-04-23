import { html } from 'lit-html';
import { ApiDemoPage } from '@advanced-rest-client/arc-demo-helper';
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
    ]);
    this.componentName = 'api-url-data-model';
    this._apiBasePramsHandler = this._apiBasePramsHandler.bind(this);
    this._endpointUriHandler = this._endpointUriHandler.bind(this);
    this._apiBaseUriHandler = this._apiBaseUriHandler.bind(this);
    this._pathModelHandler = this._pathModelHandler.bind(this);
    this._queryModelHandler = this._queryModelHandler.bind(this);

    this.endpointsOpened = true;
  }

  _navChanged(e) {
    const { selected, type } = e.detail;
    if (type === 'method') {
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

  _computeApiParams(apiPrams) {
    if (!apiPrams) {
      return 'none';
    }
    return JSON.stringify(apiPrams, null, 1);
  }

  contentTemplate() {
    return html`
    <api-url-data-model
      .amf="${this.amf}"
      @apiparameters-changed="${this._apiBasePramsHandler}"
      @endpointuri-changed="${this._endpointUriHandler}"
      @apibaseuri-changed="${this._apiBaseUriHandler}"
      @pathmodel-changed="${this._pathModelHandler}"
      @querymodel-changed="${this._queryModelHandler}"
      .selected="${this.selectedShape}"></api-url-data-model>
    ${this.hasData ?
      html`<section class="content">
        <div class="log card">
          <h3>Output</h3>
          <output><label>Base URI: </label>${this.apiBaseUri}</output>
          <output><label>Endpoint URI: </label>${this.endpointUri}</output>
          <output><label>API base parameters:<br></label>${this._computeApiParams(this.apiParameters)}</output>
          <output><label>Selected path view model:<br></label>${this._computeApiParams(this.pathModel)}</output>
          <output><label>Selected path query model:<br></label>${this._computeApiParams(this.queryModel)}</output>
        </div>
      </section>` :
      html`<p>Select a HTTP method in the navigation to see the demo.</p>`}
    `;
  }
}
const instance = new ApiDemo();
instance.render();
