import React from "react";
import { useForm, Controller } from "react-hook-form";

import {
    Stack,
    Divider,
    Select,
    Input,
  } from "@chakra-ui/core";


import { useCart } from "../hooks";
import FormControl from "~/ui/controls/FormControl";
import { Checkout } from "../types";

interface Props {
    defaultValues?: Checkout
    onSubmit: (values: Checkout) => void;
    children: (options: {
        form: JSX.Element;
        isLoading: boolean;
        submit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
    }) => JSX.Element;
}

const CheckoutForm: React.FC<Props> = ({ defaultValues = {}, children, onSubmit }) => {
    const {total, MEDIOS_PAGO} = useCart();
    
    const { handleSubmit: submit, errors, register, control, formState } = useForm<Checkout>({
        defaultValues,
    });

    function handleSubmit(values: Checkout) {
        const checkout = {...defaultValues, ...values};

        return onSubmit(checkout);
    }

    function handleChange(event: React.ChangeEvent<HTMLSelectElement>){
        if(event.target.value.toString() == "Efectivo"){
            // TODO: Habilitar input de monto
        }
        else{
            // TODO: Inhabilitar input de monto
        }
    }

    return children({
        isLoading: formState.isSubmitting,
        submit: submit(handleSubmit),
        form: (
            <form onSubmit={submit(handleSubmit)}>
                <Stack spacing={4} width="100%">
                    <Divider />
                    <FormControl
                        isRequired
                        error={errors.domicilio && (errors.domicilio.message || "Este campo es inválido")}
                        isInvalid={Boolean(errors.domicilio)}
                        label="Domicilio"
                        name="domicilio"
                    >
                        <Input
                            ref={register({required: true})}
                            name="domicilio"
                            placeholder="Ingresá tu domicilio"
                        />
                    </FormControl>
                    <FormControl
                        isRequired
                        label="Medio de pago"
                        name="pago"
                    >
                        <Select ref={register} name="pago" onChange={handleChange} placeholder="Seleccioná un medio de pago">
                            {MEDIOS_PAGO.map(({ id, nombre }) => (
                                <option key={id} value={id}>{nombre}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        isRequired={false}
                        error={errors.monto && (errors.monto.message || "Este campo es inválido")}
                        isInvalid={Boolean(errors.monto)}
                        label="Monto"
                        name="monto"
                    >
                        <Input
                            ref={register({required: true, pattern: /^[0-9]+(\,[0-9]{1,2})?$/})} 
                            name="monto"
                            placeholder="Con cuanto vas a pagar?"
                            defaultValue={total}
                            min={total}
                            type="number"
                        />
                    </FormControl>
                </Stack>
            </form>
        ),
    })
};

export default CheckoutForm;