import { Button } from '@headlessui/react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { setSideFormOpen } from "./spendingSlice"
import type { RootState } from '../../store';
import { useGetRecordsQuery, useDeleteRecordMutation } from '../../api/fin'
import { HotTable, HotColumn } from '@handsontable/react-wrapper'
import SpendingForm from './SpendingForm';

export default function Spending() {
    const dispatch = useDispatch();

    const { data: records, isLoading } = useGetRecordsQuery();
    const [deleteRecord] = useDeleteRecordMutation();

    const isOpen = useSelector((state: RootState) => state.spending.isSideFormOpen);

    const handleClickToggleBtn = () => {
        dispatch(setSideFormOpen(!isOpen));
    }

    if (isLoading) {
        return <div>Loading</div>
    }

    return <div>
        <div>
            <div>
                <HotTable
                    data={records.result}
                    rowHeaders={true}
                    colHeaders={true}
                    height="auto"
                    autoWrapRow={true}
                    autoWrapCol={true}
                    disableVisualSelection={true}
                    contextMenu={{
                        items: {
                            "remove_row": {
                                callback: function (key: any, selection : any) {
                                    const { start } = selection[0];
                                    deleteRecord(records.result[start.row].id);
                                }
                            }
                        }
                    }}
                    licenseKey="non-commercial-and-evaluation" // for non-commercial use only
                >
                    <HotColumn data="id" title="ID" />
                    <HotColumn data="FinancialMonth" title="Month"/>
                    <HotColumn data="aptCommonCharge" title="Appartment Common Charge"/>
                    <HotColumn data="aptMortgage" title="Appartment Mortgage" />
                    <HotColumn data="creditCard" title="Credit Card"/>
                    <HotColumn data="merrill" title="Investment Fund"/>
                    <HotColumn data="operatingMargin" title="Margin"/>
                    <HotColumn data="saving" title="Transfer to Saving Account"/>
                    <HotColumn data="totalExpense" title="Total Expense"/>
                    <HotColumn data="totalIncome" title="Total Income"/>
                    <HotColumn data="utility" title="Appartment Utility Expense"/>
                </HotTable>
            </div>
            <Button className="mm-bg-blue-500 mm-text-white mm-p-2 mm-rounded-lg" onClick={handleClickToggleBtn}>Add</Button>
        </div>
        {
            isOpen && <div className='mm-absolute mm-top-0 mm-left-0 mm-w-screen mm-h-screen mm-bg-neutral-200 mm-z-[200] mm-opacity-60'></div>
        }
        <div className={clsx('mm-absolute mm-z-[205] mm-top-0 mm-h-screen mm-flex mm-flex-col mm-bg-neutral-100 mm-w-72 mm-rounded-l-md mm-p-5', {
            "mm-right-0": isOpen,
            "-mm-right-80": !isOpen,
        })}>
            <div className='mm-flex-auto'>
                <SpendingForm onClickCancel={() => { dispatch(setSideFormOpen(false))}}/>
            </div>
        </div>
    </div>
}