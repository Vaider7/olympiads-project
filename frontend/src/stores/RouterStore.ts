import {Location, NavigateFunction, Params, URLSearchParamsInit} from 'react-router-dom';
import {makeObservable, observable} from 'mobx';


// eslint-disable-next-line @typescript-eslint/no-type-alias
type IURLParamSearcher = (arg0: URLSearchParamsInit,
  navigateOptions?: ({replace?: boolean | undefined, state?: unknown} | undefined)) => void


export default class RouterStore {

  navigator!: NavigateFunction;
  location!: Location;
  params!: Params;

  urlParamSetter!: IURLParamSearcher;

  setRouterStore = (navigator: NavigateFunction, location: Location, params: Params,
    urlParamSetter: IURLParamSearcher): void => {
    this.navigator = navigator;
    this.location = location;
    this.params = params;
    this.urlParamSetter = urlParamSetter;
  }

  navigate = (path: string): void => {
    this.navigator?.(path);
  }

  getParams = (param: string): string | null => {
    const search: string = this.location?.search;

    const urlAddress = new URLSearchParams(search);

    return urlAddress.get(param);
  }

  setParams = (params: string): void => {
    this.urlParamSetter(params);
  }

}