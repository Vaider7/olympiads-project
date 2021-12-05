import React, {ReactNode} from 'react';
import {MobXProviderContext, observer} from 'mobx-react';
import OlympiadStore from '../../stores/OlympiadStore';
import Loader from '../shared/Loaders/Loader';
import {Loading, TaskType} from '../../enums';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import Checkbox from '../shared/Inputs/Checkbox';
import Radio from '../shared/Inputs/Radio';
import {default as s} from './Olympiad.scss';
import classNames from 'classnames';
import TextField from '../shared/Inputs/TextField';

@observer
export default class Olympiad extends React.Component {
  static contextType = MobXProviderContext;

  OlympiadStore: OlympiadStore = this.context.OlympiadStore;

  render (): ReactNode {
    const {
      loadingStatus,
      currentTask,
      taskIdsNames,
      err,
      changeCurrentTask,
      olympiad,
      radioValue,
      changeRadioValue,
      changeCheckboxesValues,
      nextTask,
      checkboxesValues,
      typedAnswer,
      changeTypedAnswer,
      toggleCloseDialog,
      isCloseDialog,
      endOlympiad
    } = this.OlympiadStore;

    if (loadingStatus === Loading.PENDING) {
      return (
        <Loader type={'page'} />
      );
    }

    if (err) {
      return err;
    }

    const tasksIds = taskIdsNames.map((tuple) => tuple[0]);
    const nextTaskDisabled = !tasksIds.includes(currentTask.id + 1);

    return (
      <div className={s.olympiad}>
        <div className={s.leftSide}>
          <div className={s.header}>
            {`${olympiad.name} #${olympiad.id}`}
          </div>
          <div className={s.discipline}>
            {olympiad.discipline}
          </div>
          <div className={s.taskName}>
            {currentTask.name}
          </div>
          <div className={s.taskDescription}>
            {currentTask.description}
          </div>
          <div className={s.questionHeader}>
            Вопрос
          </div>
          <div className={s.taskQuestion}>
            {currentTask.question}
          </div>
          <div className={s.answerText}>
            Ответ
          </div>
          <div className={s.points}>
            Макс. баллов -
            {' '}
            {currentTask.points}
          </div>
          {currentTask.taskType === TaskType.ONE ?
            <RadioGroup aria-label={'answer'} value={radioValue} onChange={changeRadioValue} className={s.answers}>
              {currentTask.answers?.map((answer) =>
                <FormControlLabel
                  key={answer.no}
                  control={<Radio />}
                  label={answer.possibleAnswer}
                  value={String(answer.no)}
                />)}
            </RadioGroup> :
            currentTask.taskType === TaskType.MULTI ?
              <div className={s.answers}>
                {currentTask.answers?.map((answer) =>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={answer.possibleAnswer}
                    key={answer.no}
                    // @ts-expect-error: MUI is broken
                    onChange={changeCheckboxesValues}
                    name={String(answer.no)}
                    checked={checkboxesValues[answer.no]}
                  />)}
              </div> :
              currentTask.taskType === TaskType.TYPED ?
                <div className={s.answers}>

                  <TextField
                    label={'Ваш ответ'}
                    className={s.typedAnswer}
                    onChange={changeTypedAnswer}
                    value={typedAnswer}
                  />
                </div> : null}
          <div className={s.bottomButtons}>
            <button
              className={classNames({
                [s.nextTask]: true,
                [s.nextTaskDisabled]: nextTaskDisabled
              })}
              onClick={nextTask}
            >
              Следующая задача
            </button>
            <button className={s.endOlympiad} onClick={toggleCloseDialog}>Завершить олимпиаду</button>
          </div>

        </div>
        <div className={s.tabs}>
          {taskIdsNames.map((tuple) =>
            <div
              key={tuple[0]}
              className={classNames({
                [s.tab]: true,
                [s.activeTab]: currentTask.id === tuple[0]
              })}
              onClick={async () => {
                await changeCurrentTask(tuple[0]);
              }}
            >
              {tuple[1]}
            </div>
          )}
        </div>
        <Dialog
          open={isCloseDialog}
          onClose={toggleCloseDialog}
        >
          <DialogTitle>Завершить олимпиаду?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Все ваши ответы сохранены. Вы действительно хотите завершить олимпиаду?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggleCloseDialog}>
              Отклонить
            </Button>
            <Button style={{color: '#00A5F7'}} onClick={endOlympiad}>
              Завершить
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}