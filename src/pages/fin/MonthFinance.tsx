import { useParams } from 'react-router';
import { Button } from '@headlessui/react';
import {
  useGetRecordByYearAndMonthQuery,
  useDeleteRecordMutation,
} from '../../api/fin';
import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import { useSelector, useDispatch } from 'react-redux';
import { setSideFormOpen } from './spendingSlice';
import type { RootState } from '../../store';
import clsx from 'clsx';
import SpendingForm from './SpendingForm';
import { useCallback } from 'react';

function MonthFinance() {
  const dispatch = useDispatch();
  const { year, month } = useParams();

  const [deleteRecord] = useDeleteRecordMutation();
  const { data, isSuccess } = useGetRecordByYearAndMonthQuery({ year, month });
  const isOpen = useSelector(
    (state: RootState) => state.spending.isSideFormOpen
  );

  const handleClickToggleBtn = () => {
    dispatch(setSideFormOpen(!isOpen));
  };

  const handleRemoveRow = useCallback(
    (row: number) => {
      if (data?.result) {
        deleteRecord({ recordId: data.result[row].id, year, month });
      }
    },
    [data?.result, year, month]
  );

  return (
    <div>
      <div className="mm-flex mm-gap-4 mm-items-end">
        <div className="mm-text-2xl">{year}</div>
        <div className="mm-text-xl">{month}</div>
        <Button
          className="mm-bg-blue-500 mm-text-white mm-p-2 mm-rounded-lg"
          onClick={handleClickToggleBtn}
        >
          Add
        </Button>
      </div>
      {isSuccess && (
        <div>
          <HotTable
            data={data.result}
            rowHeaders={true}
            colHeaders={true}
            height="auto"
            autoWrapRow={true}
            autoWrapCol={true}
            disableVisualSelection={true}
            contextMenu={{
              items: {
                remove_row: {
                  callback: function (key: any, selection: any) {
                    console.log('remove_row selection:', key, selection);
                    handleRemoveRow(selection[0].start.row);
                    // const { start } = selection[0];
                    // deleteRecord(records.result[start.row].id);
                  },
                },
              },
            }}
            licenseKey="non-commercial-and-evaluation" // for non-commercial use only
          >
            <HotColumn data="id" title="ID" />
            <HotColumn
              data="items.aptCommonCharge"
              title="Appartment Common Charge"
            />
            <HotColumn data="items.aptMortgage" title="Appartment Mortgage" />
            <HotColumn data="items.creditCard" title="Credit Card" />
            <HotColumn data="items.merrill" title="Investment Fund" />
            <HotColumn data="totalExpense" title="Total Expense" />
            <HotColumn data="totalIncome" title="Total Income" />
          </HotTable>
          {isOpen && (
            <div className="mm-absolute mm-top-0 mm-left-0 mm-w-screen mm-h-screen mm-bg-neutral-200 mm-z-[200] mm-opacity-60">
              <div
                className={clsx(
                  'mm-absolute mm-z-[205] mm-top-0 mm-h-screen mm-flex mm-flex-col mm-bg-neutral-100 mm-w-72 mm-rounded-l-md mm-p-5',
                  {
                    'mm-right-0': isOpen,
                    '-mm-right-80': !isOpen,
                  }
                )}
              >
                <div className="mm-flex-auto">
                  <SpendingForm
                    onClickCancel={() => {
                      dispatch(setSideFormOpen(false));
                    }}
                    year={year}
                    month={month}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MonthFinance;
