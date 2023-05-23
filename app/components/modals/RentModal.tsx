'use client'

import { Modal } from "./Modal"
import { useRentModal } from "@/app/hooks/useRentModal"
import { useMemo, useState } from "react"
import { Heading } from "@/app/components/Heading"
import { categories } from "../navbar/Categories"
import { CategoryInput } from "@/app/components/inputs/CategoryInput"
import { CountrySelect } from "@/app/components/inputs/CountrySelect"
// import { Map } from "../Map"
import {FieldValues, SubmitHandler, useForm} from "react-hook-form"
import dynamic from "next/dynamic"
import Counter from "@/app/components/inputs/Counter"
import ImageUpload from "@/app/components/inputs/ImageUpload"
import { Input } from "@/app/components/inputs/Input"
import axios from "axios"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

export const RentModal = () => {

    const router = useRouter()

    const rentModel = useRentModal()

    const [step, setStep] = useState(STEPS.CATEGORY)
    const [isloading, setIsloading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    })

    const location = watch('location')
    const category = watch('category')
    const guestCount = watch('guestCount')
    const roomCount = watch('roomCount')
    const bathroomCount = watch('bathroomCount')
    const imageSrc = watch('imageSrc')

    const Map = useMemo(
        () => dynamic(
            () => import('../Map'),
            {
                ssr: false
            }
        ),
        [location]
    )

    const setCustomValue = (id: string, value:any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((value) => value - 1)
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = ( data ) => {
        if (step !== STEPS.PRICE) {
            return onNext()
        }

        setIsloading(true)

        console.log(data,'data')

        axios.post('/api/listings', data)
            .then(() => {
                toast.success('Listing Created!')
                router.refresh()
                reset()
                setStep(STEPS.CATEGORY)
                rentModel.onClose()
            })
            .catch(() => {
                toast.error('Something went wrong')
            })
            .finally(() => {
                setIsloading(false)
            })

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
       <div
        className="
            flex
            flex-col
            gap-8
        "
       >
           <Heading
               title="Which of these best describes your place?"
               subtitle="Pick a category"
           />

           <div
               className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
               "
           >
               { categories.map(i => (
                   <div
                    key={ i.label }
                    className="
                        col-span-1
                    "
                   >
                       {/*{ i.label }*/}
                       <CategoryInput
                           onClick={ ( category ) => setCustomValue('category', category) }
                           label={ i.label }
                           selected={ category === i.label }
                           icon={ i.icon }
                       />
                   </div>
               )) }
           </div>
       </div>
    )

    if ( step === STEPS.LOCATION ) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />

                <CountrySelect
                    value={ location }
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map
                    center={ location?.latlng }
                />
            </div>
        )

        // console.log(bodyContent,'bodyContent')
    }

    if ( step === STEPS.INFO ) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="Share some basics your place"
                    subtitle="What amenities do you have?"
                />

                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={ guestCount }
                    onChange={ (value) => setCustomValue('guestCount',value)}
                />
                <hr/>
                <Counter
                    title="Rooms"
                    subtitle="How many Rooms do you have?"
                    value={ roomCount }
                    onChange={ (value) => setCustomValue('roomCount',value)}
                />
                <hr/>
                <Counter
                    title="Bathrooms"
                    subtitle="How many Bathrooms do you have?"
                    value={ bathroomCount }
                    onChange={ (value) => setCustomValue('bathroomCount',value)}
                />
            </div>
        )

        // console.log(bodyContent,'bodyContent')
    }

    if ( step === STEPS.IMAGES ) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />

               <ImageUpload
                    value={ imageSrc }
                    onChange={(value) => setCustomValue('imageSrc', value)}
               />
            </div>
        )

        // console.log(bodyContent,'bodyContent')
    }

    if ( step === STEPS.DESCRIPTION ) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="How would you describe your place"
                    subtitle="Short and sweet works best!"
                />

                <Input
                    id="title"
                    label="Title"
                    disabled={ isloading }
                    register={ register }
                    errors={ errors }
                    required
                />
                <hr/>
                <Input
                    id="description"
                    label="Discription"
                    disabled={ isloading }
                    register={ register }
                    errors={ errors }
                    required
                />
            </div>
        )

        // console.log(bodyContent,'bodyContent')
    }

    if ( step === STEPS.PRICE ) {
        bodyContent = (
            <div
                className="
                    flex
                    flex-col
                    gap-8
                "
            >
                <Heading
                    title="Now, set your price"
                    subtitle="How much do you charge per night"
                />

                <Input
                    id="price"
                    label="Price"
                    type="number"
                    disabled={ isloading }
                    register={ register }
                    errors={ errors }
                    formatPrice
                    required
                />
            </div>
        )

        // console.log(bodyContent,'bodyContent')
    }

    return (
        <Modal
            isOpen={ rentModel.isOpen }
            onClose={ rentModel.onClose }
            onSubmit={ handleSubmit(onSubmit) }
            actionLabel={ actionLabel }
            secondaryActionLabel={ secondaryActionLabel }
            secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack }
            title="Airbnb your home!"
            body={ bodyContent }
        />
    )
}
