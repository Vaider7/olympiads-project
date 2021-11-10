import {action, makeObservable, observable} from 'mobx';
import {Loading} from '../enums';
import request from './utils';
import {Olympiad} from '../types';


export default class IndexStore {
  constructor () {
    makeObservable(this);

    this.loadOlympiads();
  }

  @observable loadingStatus = Loading.PENDING;
  @observable selectedOlympiad: Olympiad | undefined;

  olympiads: Olympiad[] = [];

  @action changeLoadingStatus = (status: Loading): void => {
    this.loadingStatus = status;
  }

  @action setOlympiadDetails = (id: number | undefined): void => {
    if (id === undefined) {
      this.selectedOlympiad = undefined;
    }
    this.selectedOlympiad = this.olympiads.find((olympiad) => olympiad.id === id);
  }

  // @action takePart = (): void => {
  //   window.notify('success', 'Вы успешно зарегестрировались на олимпиаду');
  //
  //   this.setOlympiadDetails(undefined);
  // }

  setOlympiads = (olympiads: Olympiad[]): void => {
    this.olympiads = olympiads;
  }

  loadOlympiads = async (): Promise<void> => {
    const result = await request('get', '/api/olympiads/get');

    const olympiads = result.res?.data as Olympiad[];

    for (const olympiad of olympiads) {
      const start = new Date(olympiad.start);
      const end = new Date(olympiad.end);
      const {duration} = olympiad;

      olympiad.formattedStart =
        `${start.getDate()}.${String(start.getMonth()).length === 1 ? String(`0${start.getMonth()}`) :
          start.getMonth()} в ${start.getHours()}:${start.getMinutes()}`;
      olympiad.formattedEnd =
        `${end.getDate()}.${String(end.getMonth()).length === 1 ? String(`0${end.getMonth()}`) :
          end.getMonth()} в ${end.getHours()}:${end.getMinutes()}`;
      olympiad.formattedDuration = `${Math.floor(duration / 60)} ч ${duration % 60 === 0 ? '' : `${duration % 60} мин`}`;
    }

    this.olympiads = result.res?.data as Olympiad[];
    this.changeLoadingStatus(Loading.DONE);
  }

  takePart = async (): Promise<void> => {
    this.changeLoadingStatus(Loading.PENDING);

    await request('post', '/api/users-olympiads/register', {olympiad_id: this.selectedOlympiad?.id});


  }
}