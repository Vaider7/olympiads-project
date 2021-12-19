import {default as s} from './Result.scss';
import React from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {Loading, TaskType} from '../../enums';
import Loader from '../shared/Loaders/Loader';
import Radio from '../shared/Inputs/Radio';
import ResultStore from '../../stores/ResultStore';
import {FormControlLabel, RadioGroup} from '@material-ui/core';
import classNames from 'classnames';
import Checkbox from '../shared/Inputs/Checkbox';
import TextField from '../shared/Inputs/TextField';


@observer
export default class Result extends React.Component {
  static contextType = MobXProviderContext;

  ResultStore: ResultStore = this.context.ResultStore;

  render (): React.ReactNode {
    const {loadingStatus, olympiad, results} = this.ResultStore;
    if (loadingStatus === Loading.PENDING) {
      return (
        <Loader type={'page'} />
      );
    }

    return (
      <div className={s.page}>
        <div className={s.header}>
          {`${olympiad.name} #${olympiad.id} – Результаты`}
        </div>
        {results.map((result) => {

          if (result.taskType === TaskType.ONE) {
            const rightAnswer = result.taskAnswers.find((elem) => elem.verity);

            return (
              <div key={result.taskId}>
                <div className={s.taskName}>
                  {result.taskName}
                </div>
                <div className={s.taskPoints}>
                  Макс. баллов -
                  {' '}
                  {result.taskPoints}
                </div>
                <RadioGroup aria-label={'answer'} value={rightAnswer?.no} className={s.answers} key={result.taskId}>
                  {result.taskAnswers.map((answer) =>
                    <React.Fragment key={answer.no}>
                      <FormControlLabel
                        className={classNames({
                          [s.rightAnswer]: answer.verity
                        })}
                        control={<Radio />}
                        label={answer.possibleAnswer}
                        value={answer.no}
                      />
                    </React.Fragment>
                  )}
                </RadioGroup>
                <div className={s.userPoints}>
                  Ваш результат:
                  {' '}
                  {result.userPoints}
                  {' '}
                  из
                  {' '}
                  {result.taskPoints}
                  {' '}
                  баллов
                </div>
              </div>
            );

          } else if (result.taskType === TaskType.MULTI) {

            return (
              <div key={result.taskId}>
                <div className={s.taskName}>
                  {result.taskName}
                </div>
                <div className={s.taskPoints}>
                  Макс. баллов -
                  {' '}
                  {result.taskPoints}
                </div>
                <div className={s.multiAnswer}>
                  {result.taskAnswers.map((answer) =>
                    <FormControlLabel
                      className={classNames({
                        [s.rightAnswer]: answer.verity
                      })}
                      key={answer.no}
                      control={<Checkbox checked={answer.verity} />}
                      label={answer.possibleAnswer}
                      value={String(answer.no)}
                    />
                  )}
                </div>
                <div className={s.userPoints}>
                  Ваш результат:
                  {' '}
                  {result.userPoints}
                  {' '}
                  из
                  {' '}
                  {result.taskPoints}
                  {' '}
                  баллов
                </div>
              </div>
            );
          } else if (result.taskType === TaskType.TYPED) {

            return (
              <div key={result.taskId}>
                <div className={s.taskName}>
                  {result.taskName}
                </div>
                <div className={s.taskPoints}>
                  Макс. баллов -
                  {' '}
                  {result.taskPoints}
                </div>

                <div className={s.idk}>
                  <div className={s.userAnswer}>
                    Ваш ответ:
                    {' '}
                    <TextField
                      style={{marginLeft: '39px'}}
                      className={s.something}
                      value={result.userAnswer[0]}
                    />
                  </div>
                  <div className={s.userAnswer}>
                    Верный ответ:
                    {' '}
                    <TextField
                      className={s.something}
                      value={result.typedAnswer[0]}
                    />
                  </div>
                </div>
                <div className={s.userPoints}>
                  Ваш результат:
                  {' '}
                  {result.userPoints}
                  {' '}
                  из
                  {' '}
                  {result.taskPoints}
                  {' '}
                  баллов
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}