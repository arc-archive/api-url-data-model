/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   src/ApiUrlDataModel.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {LitElement, html, css} from 'lit-element';

import {AmfHelperMixin} from '@api-components/amf-helper-mixin/amf-helper-mixin.js';

export {ApiUrlDataModel};

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
 */
declare class ApiUrlDataModel extends
  AmfHelperMixin(
  LitElement) {
  readonly styles: any;
  readonly _transformer: any;

  /**
   * Computed value of server definition from the AMF model.
   */
  server: object|null;

  /**
   * List of supported protocols.
   * Required to compute base URI in some cases.
   *
   * This value is computed when AMF model change.
   */
  protocols: Array<String|null>|null;

  /**
   * API version name.
   * Computed when AMF model change
   */
  version: String|null;

  /**
   * The `@id` property of selected endpoint and method to compute
   * data models for.
   */
  selected: string|null|undefined;

  /**
   * A value to override API's base URI.
   */
  apiUri: String|null;

  /**
   * Computed view model for API uri parameters.
   */
  readonly apiParameters: Array<object|null>|null;
  _apiParameters: any;
  readonly apiBaseUri: String|null;
  _apiBaseUri: any;

  /**
   * Computed model of HTTP method.
   */
  readonly method: object|null;
  _method: any;
  readonly queryModel: Array<object|null>|null;
  _queryModel: any;
  readonly pathModel: Array<object|null>|null;
  _pathModel: any;

  /**
   * Computed model of selected endpoint.
   */
  readonly endpoint: object|null;
  _endpoint: any;
  readonly endpointUri: String|null;
  _endpointUri: any;
  readonly endpointPath: String|null;
  _endpointPath: any;
  onapiparameters: EventListener|null;
  onapibaseuri: EventListener|null;
  onquerymodel: EventListener|null;
  onpathmodel: EventListener|null;
  onendpointuri: EventListener|null;
  onendpointpath: EventListener|null;

  /**
   * Name of the scope to use with `raml-aware`.
   * If this element is used with other aware elements, it updates
   * `webApi` when aware value change.
   */
  aware: string|null|undefined;
  constructor();
  connectedCallback(): void;
  disconnectedCallback(): void;
  render(): any;

  /**
   * Computes list of query parameters to be rendered in the query parameters table.
   *
   * The parameters document can pass a type definition for query parameters
   * or a list of properties to be rendered without the parent type definition.
   *
   * @param scheme Model for Expects shape of AMF model.
   * @returns Either list of properties or a type definition
   * for a queryString property of RAML's
   */
  _computeQueryParameters(scheme: object|null): Array<object|null>|object|null;

  /**
   * Registers an event handler for given type
   *
   * @param eventType Event type (name)
   * @param value The handler to register
   */
  _registerCallback(eventType: String|null, value: EventListener|null): void;

  /**
   * Computes values for `server`, `version`, and `protocol` properties if the
   * model is a web api model.
   *
   * @param model The AMF model.
   */
  _amfChanged(model: object|null): void;

  /**
   * Computes `apiBaseUri` property when `amf` change.
   *
   * @param server Server definition model
   * @param version API version number
   * @param protocols List of supported protocols.
   * @param apiUri A uri to override APIs base uri
   */
  _computeApiBaseUri(server: object|null, version: String|null, protocols: Array<String|null>|null, apiUri: String|null): String|null;

  /**
   * Computes uri paramerters lsit for API base.
   * If `version` is set it eliminates it from the variables if it's set.
   *
   * @param server The `http://raml.org/vocabularies/http#server`
   * object
   * @param version API version number
   * @returns A view model.
   */
  _computeApiParameters(server: object|null, version: String|null): Array<object|null>|null;

  /**
   * Computes combined list of path parameters from server definition
   * (RAML's base URI) and current path variables.
   *
   * @param endpoint Endpoint model
   * @param method Method model
   * @param apiParameters Current value of API parameters
   */
  _computePathModel(endpoint: object|null, method: object|null, apiParameters: Array<object|null>|null): Array<object|null>|null;

  /**
   * Finds URI parameters in method definition.
   *
   * @param method Method model
   */
  _uriParamsFromMethod(method: object|null): Array<object|null>|null|undefined;

  /**
   * Computes value for `queryModel` property.
   *
   * @param method Supported operation model
   */
  _computeQueryModel(method: object|null): Array<object|null>|null;

  /**
   * Computes endpoint's path value
   *
   * @param endpoint Endpoint model
   */
  _computeEndpointPath(endpoint: object|null): String|null;

  /**
   * Computes value of endpoint model.
   *
   * The selection (id) can be for endpoint or for a method.
   * This tries endpoint first and then method.
   *
   * The operation result is set on `_endpoint` property.
   */
  _computeModelEndpointModel(): void;
  _computeMethodAmf(): void;
  _apiChangedHandler(e: any): void;

  /**
   * Clears the cache in the view model transformer.
   */
  clearCache(): void;
}
