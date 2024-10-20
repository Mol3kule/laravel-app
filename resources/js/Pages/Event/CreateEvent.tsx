import {PageProps} from "@/types";
import {Event} from "@/types/Event";
import {Head, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import {Textarea} from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton";
import {FormEventHandler} from "react";

interface Props extends PageProps {
    data: Event;
}

export default function CreateEvent({auth}: Props) {
    const {post, data, setData} = useForm({
        title: '',
        description: '',
        date: new Date(),
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('event.create.submit'));
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Create event page
                </h2>
            }
        >
            <Head title="Events Control Panel"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <form className="flex flex-col gap-4 p-6 text-gray-900 dark:text-gray-100"
                              onSubmit={handleSubmit}>
                            <div>
                                <InputLabel htmlFor={'title'}>Event title</InputLabel>
                                <TextInput name={'title'} placeholder={'Enter a title'} className={"border-none"}
                                           value={data.title}

                                />
                            </div>

                            <div>
                                <InputLabel htmlFor={'description'}>Event description</InputLabel>
                                <Textarea name={'description'} placeholder={'Enter a description'}
                                          className={"rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 border-none"}
                                          value={data.description}
                                />
                            </div>

                            <div>
                                <InputLabel htmlFor={'date-time'}>Event date & time</InputLabel>
                                <input type={'datetime-local'} name={'date-time'}
                                       className={"rounded-md text-gray-300 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 border-none"}
                                       // value={data.date}
                                />
                            </div>
                            <PrimaryButton className={"w-max"}>Create event</PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}