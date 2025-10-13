import { Button, Input, Label, Field, Fieldset, Legend } from '@headlessui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateRecordMutation } from '../../api/fin'
import { format } from 'date-fns'
import React from 'react'

interface FormData {
    financialMonth: string,
    totalSalary: number
    aptCommonCharge: number
    aptMortgage: number
    utility: number
    merrill: number
    creditCard: number
    saving: number
}

interface SpendingFormProps {
    onClickCancel: (event: React.MouseEvent<HTMLButtonElement>) => void
    year: string | undefined
    month: string | undefined
}

function SpendingForm({ onClickCancel, year, month } : SpendingFormProps) {
    const [ createRecordRequest ] = useCreateRecordMutation();
    const { handleSubmit, register } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        data.financialMonth = format(new Date(), 'yyyy-MM')
        const { data: createdRecord, isSuccess, isError } = await createRecordRequest({ items: data, year, month });

        console.log("created record", createdRecord)

        if (isSuccess) {
            // invalidate the query cache to refetch the records
        } else if (isError) {
            // show error message
        }
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="mm-flex mm-flex-col mm-gap-5">
            <Legend>Add Spending</Legend>
            <Field className="mm-flex mm-flex-col">
                <Label>Total Income</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("totalSalary", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Appartment Expense</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("aptCommonCharge", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Appartment Utility</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("utility", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Mortgage</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("aptMortgage", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Investment Fund</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("merrill", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Credit Card</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("creditCard", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Saving</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("saving", { valueAsNumber: true })}/>
            </Field>
        </Fieldset>
        <div className='mm-flex mm-justify-evenly'>
            <Button className="mm-bg-neutral-200 mm-p-2 mm-rounded-lg" onClick={onClickCancel}>Cancel</Button>
            <Button type="submit" className="mm-bg-blue-500 mm-text-white mm-p-2 mm-rounded-lg">Submit</Button>
        </div>
    </form>
  )
}

export default SpendingForm
