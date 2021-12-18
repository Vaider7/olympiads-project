import {default as s} from './Result.scss';
import React from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import {Loading, TaskType} from '../../enums';
import Loader from '../shared/Loaders/Loader';
import ResultStore from '../../stores/ResultStore';
import {FormControlLabel, RadioGroup} from '@material-ui/core';
import Radio from '../shared/Inputs/Radio';


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
              <RadioGroup aria-label={'answer'} value={rightAnswer?.no} className={s.answers} key={result.taskId}>
                {result.taskAnswers.map((answer) =>
                <React.Fragment key={answer.no}>
                  <FormControlLabel
                    control={<Radio />}
                    label={answer.possibleAnswer}
                    value={answer.no}
                  />
                </React.Fragment>
                )}
              </RadioGroup>
            );

          }
          // else if (result.taskType === TaskType.MULTI) {
          //   result.taskAnswers.map((answer) => {
          //     const rightAnswer = result.taskAnswers.filter((elem) => elem.verity);
          //
          //     return (
          //       <RadioGroup aria-label={'answer'} value={rightAnswer} className={s.answers} key={answer.no}>
          //         <FormControlLabel
          //           control={<Radio />}
          //           label={answer.possibleAnswer}
          //           value={String(answer.no)}
          //         />
          //       </RadioGroup>
          //     );
          //   });
          // }
        })}
      </div>
    );
  }
}