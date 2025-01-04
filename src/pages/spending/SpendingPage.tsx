import { Input, Label, Field, Button, Fieldset, Legend } from '@headlessui/react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { setSideFormOpen } from "./spendingSlice"
import type { RootState } from '../../store';
import { useGetRecordsQuery } from '../../api/fin'
import { HotTable, HotColumn } from '@handsontable/react-wrapper'

export default function Spending() {
    const dispatch = useDispatch();

    const { data: records, isLoading } = useGetRecordsQuery();

    const isOpen = useSelector((state: RootState) => state.spending.isSideFormOpen);

    const handleClickToggleBtn = () => {
        dispatch(setSideFormOpen(!isOpen));
    }

    const handleSubmitBtn = () => {
        dispatch(setSideFormOpen(false));
    }

    if (isLoading) {
        return <div> Loading </div>
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
        <div className={clsx('mm-absolute mm-top-0 mm-h-screen mm-flex mm-flex-col mm-bg-neutral-100 mm-w-72 mm-rounded-l-md mm-p-5', {
            "mm-right-0": isOpen,
            "-mm-right-72": !isOpen,
        })}>
            <div className='mm-flex-auto'>
                <Fieldset className="mm-flex mm-flex-col mm-gap-5">
                    <Legend>Spending Details</Legend>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Total Salary</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number" />
                    </Field>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Appartment Common Charge</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number" />
                    </Field>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Appartment Mortgage</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number" />
                    </Field>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Appartment Utility</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number" />
                    </Field>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Stock Fund</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number" />
                    </Field>
                    <Field className="mm-flex mm-flex-col">
                        <Label>Credit Card Spending</Label>
                        <Input className="mm-border-2 mm-border-black mm-rounded" type="number"></Input>
                    </Field>
                </Fieldset>
            </div>
            <div className='mm-flex mm-justify-evenly'>
                <Button className="mm-bg-neutral-200 mm-p-2 mm-rounded-lg" onClick={handleSubmitBtn}>Cancel</Button>
                <Button className="mm-bg-blue-500 mm-text-white mm-p-2 mm-rounded-lg">Submit</Button>
            </div>
        </div>
    </div>
}