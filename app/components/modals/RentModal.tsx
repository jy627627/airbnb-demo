'use client'

import { Modal } from "./Modal";
import { useRentModal } from "@/app/hooks/useRentModal";
import {useMemo, useState} from "react";
import {Heading} from "@/app/components/Heading";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export const RentModal = () => {

    const rentModel = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const actionLabel = useMemo(() => {
        if ( step === STEPS.PRICE ) {
            return 'Crate'
        }

        return 'Next'

    },[step])

    const secondaryActionLabel = useMemo(() => {
        if ( step === STEPS.CATEGORY ) {
            return undefined
        }

        return 'Back'

    },[step])

    let bodyContent = (
        <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
        />
    )

    return (
        <Modal
            isOpen={ rentModel.isOpen }
            onClose={ rentModel.onClose }
            onSubmit={ rentModel.onClose }
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
            title="Airbnb your home!"
            body={ bodyContent }
        />
    )
}
