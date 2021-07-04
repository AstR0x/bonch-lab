import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Heading } from '@common/components';
import { GetTaskListParams } from '@features/tasks';
import { dictionariesSelectors } from '@features/dictionaries';
import { labsSelectors, LabsTable } from '@features/labs';
import { labsProcessActions } from '@processes/labs';

/**
 * Страница "Лабораторные работы по теме"
 *
 * @returns react-элемент
 */
export const LabsPage: React.FC = () => {
  const { id: topic } = useParams();
  const dispatch = useDispatch();
  const labsList = useSelector(labsSelectors.labListSelector);
  const structure = useSelector(dictionariesSelectors.structureSelector);

  /**
   * Получение списка лабораторных работ
   *
   * @param params - параметры запроса
   */
  const handleGetLabsList = (params: GetTaskListParams) =>
    dispatch(labsProcessActions.getLabList(params));

  return (
    <>
      <Heading>
        {topic}. {structure[topic].title}
      </Heading>
      <LabsTable
        topic={topic}
        labsList={labsList}
        structure={structure}
        onGetLabList={handleGetLabsList}
      />
    </>
  );
};
