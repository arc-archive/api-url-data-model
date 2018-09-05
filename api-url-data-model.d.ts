/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   api-url-data-model.html
 */

/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../polymer/types/lib/elements/dom-if.d.ts" />
/// <reference path="../raml-aware/raml-aware.d.ts" />
/// <reference path="../api-view-model-transformer/api-view-model-transformer.d.ts" />
/// <reference path="../amf-helper-mixin/amf-helper-mixin.d.ts" />

declare namespace ApiElements {

  /**
   * `api-url-data-model`
   * An element to generate view model for api-url-editor and api-url-params-editor
   * elements from AMF model
   */
  class ApiUrlDataModel extends
    ApiElements.AmfHelperMixin(
    Object) {

    /**
     * Name of the scope to use with `raml-aware`.
     * If this element is used with other aware elements, it updates
     * `webApi` when aware value change.
     */
    aware: string|null|undefined;

    /**
     * Computed value of WebApi amf shape.
     */
    readonly _webApi: object|null|undefined;

    /**
     * Computed value pof server definition from the AMF model.
     */
    readonly _server: object|null|undefined;

    /**
     * List of supported protocols.
     * Required to compute base URI in some cases.
     */
    readonly _protocols: object|null|undefined;

    /**
     * API version name
     */
    readonly version: string|null|undefined;

    /**
     * The `@id` property of selected endpoint and method to compute
     * data models for.
     */
    selected: string|null|undefined;

    /**
     * Computed model of selected endpoint
     */
    readonly endpoint: object|null|undefined;

    /**
     * Computed model of HTTP method.
     */
    readonly method: object|null|undefined;

    /**
     * Computed view model for API uri parameters.
     */
    readonly apiParameters: any[]|null|undefined;

    /**
     * A property to set to override AMF's model base URI information.
     * When this property is set, the `endpointUri` property is recalculated.
     */
    baseUri: string|null|undefined;

    /**
     * Computed value of API base URI.
     */
    readonly apiBaseUri: string|null|undefined;

    /**
     * Generated view model for query parameters.
     */
    readonly queryModel: any[]|null|undefined;

    /**
     * Generated view model for path parameters
     */
    readonly pathModel: object|null;

    /**
     * Computed value of full endpoint URI when selection has been made.
     */
    readonly endpointUri: string|null|undefined;

    /**
     * Selected endponit relative path.
     */
    readonly endpointPath: string|null|undefined;

    /**
     * Computes `apiBaseUri` property when `amfModel` change.
     *
     * @param version API version number
     * @param protocols List of supported protocols.
     * @param baseUri A uri to override APIs base uri
     */
    _computeApiBaseUri(server: any, version: String|null, protocols: Array<String|null>|null, baseUri: String|null): any;

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
     */
    _computePathModel(endpoint: object|null): Array<object|null>|null;

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
     * @param webApi A WebApi amf shape.
     * @param id Endpoint/method selection
     * @returns Endpoint model.
     */
    _computeModelEndpointModel(webApi: object|null, id: String|null): object|null|undefined;
  }
}

interface HTMLElementTagNameMap {
  "api-url-data-model": ApiElements.ApiUrlDataModel;
}
