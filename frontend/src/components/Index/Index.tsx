import React, {ReactNode} from 'react';

import {default as s} from './Index.scss';
import {MobXProviderContext, observer} from 'mobx-react';
import IndexStore from '../../stores/IndexStore';
import Loader from '../shared/Loaders/Loader';
import {Loading, OlympiadStatus} from '../../enums';
import Button from '../shared/Button/Button';
import classNames from 'classnames';

@observer
export default class Index extends React.Component {
  static contextType = MobXProviderContext;
  IndexStore: IndexStore = this.context.IndexStore


  render (): ReactNode {
    const {
      loadingStatus,
      olympiads,
      selectedOlympiad,
      setOlympiadDetails,
      takePart,
      registeredOlympiads,
      displayShit,
      loadingRegistered,
      startOlympiad
    } = this.IndexStore;
    if (loadingStatus === Loading.PENDING && olympiads.length === 0) {
      return (
        <div className={s.loaderWrapper}>
          <Loader type={'element'} className={s.loader} />
        </div>
      );
    }


    if (selectedOlympiad) {
      return (
        <div className={s.selectedOlympiad}>
          <div>
            <span className={s.header}>
              {selectedOlympiad.name}
              {' '}
              #
              {selectedOlympiad.id}
            </span>
          </div>
          <div className={s.discipline}>
            {selectedOlympiad.discipline}
          </div>
          <div className={s.description}>
            {selectedOlympiad.description}
          </div>
          <div className={s.buttons}>
            <Button
              className={loadingStatus === Loading.PENDING ? s.inProgress : s.accept}
              onClick={takePart}
            >
              {loadingStatus === Loading.PENDING ?
                <Loader type={'element'} className={s.loader} thickness={2} /> :
                'Принять участие'}
            </Button>
            <Button
              className={s.decline}
              onClick={() => {
                setOlympiadDetails(undefined);
              }}
            >
              Вернуться
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={s.indexPage}>
        <div className={s.header}>Текущие</div>
        <table className={s.table}>
          <thead>
            <tr className={s.tr}>
              <th className={s.th}>#</th>
              <th className={s.th}>Название</th>
              <th className={s.th}>Дисциплина</th>
              <th className={s.th}>Открытие</th>
              <th className={s.th}>Конец</th>
              <th className={s.th}>Продолжительность</th>
            </tr>
          </thead>
          <tbody>
            {olympiads.map((olympiad) =>
              <tr key={olympiad.id} className={s.tr}>
                <td className={s.td}>{olympiad.id}</td>
                <td className={s.td}>{olympiad.name}</td>
                <td className={s.td}>{olympiad.discipline}</td>
                <td className={s.td}>{olympiad.formattedStart}</td>
                <td className={s.td}>{olympiad.formattedEnd}</td>
                <td className={s.td}>{olympiad.formattedDuration}</td>
                <td className={s.td} style={{width: '184px'}}>
                  <span
                    className={
                      classNames({
                        [s.takePart]: olympiad.status === OlympiadStatus.WAITING_START ||
                          olympiad.status === OlympiadStatus.IN_PROGRESS,
                        [s.finished]: olympiad.status === OlympiadStatus.FINISHED,
                        [s.waitingStart]: olympiad.status === OlympiadStatus.WAITING_START &&
                          registeredOlympiads.includes(olympiad.id)
                      })
                    }
                    onClick={() => {
                      if (olympiad.status === OlympiadStatus.FINISHED)
                        return;

                      if (registeredOlympiads.includes(olympiad.id) && olympiad.status === OlympiadStatus.WAITING_START)
                        return;

                      if (registeredOlympiads.includes(olympiad.id) && olympiad.status === OlympiadStatus.IN_PROGRESS) {
                        startOlympiad(olympiad.id);

                        return;
                      }


                      setOlympiadDetails(olympiad.id);
                    }}
                  >
                    {loadingRegistered === Loading.PENDING ?
                      <Loader type={'element'} className={s.inlineLoader} thickness={3} /> : displayShit(olympiad)}
                  </span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
