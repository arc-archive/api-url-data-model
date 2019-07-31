import { html } from 'lit-html';
import { ApiDemoPageBase } from '@advanced-rest-client/arc-demo-helper/ApiDemoPage.js';
import '@api-components/api-navigation/api-navigation.js';
import '../api-url-data-model.js';

class ApiDemo extends ApiDemoPageBase {
  constructor() {
    super();
    this._apiBasePramsHandler = this._apiBasePramsHandler.bind(this);
    this._endpointUriHandler = this._endpointUriHandler.bind(this);
    this._apiBaseUriHandler = this._apiBaseUriHandler.bind(this);
    this._pathModelHandler = this._pathModelHandler.bind(this);
    this._queryModelHandler = this._queryModelHandler.bind(this);

    this.endpointsOpened = true;
  }

  get hasData() {
    return this._hasData;
  }

  set hasData(value) {
    this._setObservableProperty('hasData', value);
  }

  get apiBasePrams() {
    return this._apiBasePrams;
  }

  set apiBasePrams(value) {
    this._setObservableProperty('apiBasePrams', value);
  }

  get endpointUri() {
    return this._endpointUri;
  }

  set endpointUri(value) {
    this._setObservableProperty('endpointUri', value);
  }

  get apiBaseUri() {
    return this._apiBaseUri;
  }

  set apiBaseUri(value) {
    this._setObservableProperty('apiBaseUri', value);
  }

  get pathModel() {
    return this._pathModel;
  }

  set pathModel(value) {
    this._setObservableProperty('pathModel', value);
  }

  get queryModel() {
    return this._queryModel;
  }

  set queryModel(value) {
    this._setObservableProperty('queryModel', value);
  }

  get selectedShape() {
    return this._selectedShape;
  }

  set selectedShape(value) {
    this._setObservableProperty('selectedShape', value);
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
    return html`
    <paper-item data-src="demo-api.json">ARC demo api</paper-item>
    <paper-item data-src="demo-api-compact.json">ARC demo api - compact model</paper-item>
    <paper-item data-src="loan-microservice.json">Loan microservice api</paper-item>
    <paper-item data-src="loan-microservice-compact.json">Loan microservice api - compact model</paper-item>
    <paper-item data-src="petstore.json">Petstore api</paper-item>
    <paper-item data-src="petstore-compact.json">Petstore - compact model</paper-item>
    `;
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
    <demo-element id="helper" .amf="${this.amf}"></demo-element>
    <raml-aware .api="${this.amf}" scope="api-console"></raml-aware>
    <api-url-data-model
      aware="api-console"
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
