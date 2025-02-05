import { Button, Input, Label, Field, Fieldset, Legend } from '@headlessui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCreateRecordMutation } from '../../api/fin'
import { format } from 'date-fns'

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

function SpendingForm({ formData }: { formData: FormData }) {
    const [ createRecordRequest ] = useCreateRecordMutation();
    const { handleSubmit, register } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        data.financialMonth = format(new Date(), 'yyyy-MM')
        createRecordRequest(data)
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Fieldset className="mm-flex mm-flex-col mm-gap-5">
            <Legend>Spending Details</Legend>
            <Field className="mm-flex mm-flex-col">
                <Label>Total Salary</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("totalSalary", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Appartment Common Charge</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("aptCommonCharge", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Appartment Mortgage</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number"  {...register("aptMortgage", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Appartment Utility</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("utility", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Stock Fund</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("merrill", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Credit Card Spending</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("creditCard", { valueAsNumber: true })}/>
            </Field>
            <Field className="mm-flex mm-flex-col">
                <Label>Saving</Label>
                <Input className="mm-border-2 mm-border-black mm-rounded" type="number" {...register("saving", { valueAsNumber: true })}/>
            </Field>
        </Fieldset>
        <div className='mm-flex mm-justify-evenly'>
            <Button className="mm-bg-neutral-200 mm-p-2 mm-rounded-lg">Cancel</Button>
            <Button type="submit" className="mm-bg-blue-500 mm-text-white mm-p-2 mm-rounded-lg">Submit</Button>
        </div>
    </form>
  )
}

export default SpendingForm
